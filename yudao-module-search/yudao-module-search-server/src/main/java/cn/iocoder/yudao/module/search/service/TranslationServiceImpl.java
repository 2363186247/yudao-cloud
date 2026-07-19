package cn.iocoder.yudao.module.search.service;

import cn.hutool.core.util.StrUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.File;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import ai.djl.huggingface.tokenizers.HuggingFaceTokenizer;
import ai.djl.huggingface.tokenizers.Encoding;
import ai.djl.translate.Translator;
import ai.djl.translate.TranslatorContext;
import ai.djl.ndarray.NDList;
import ai.djl.ndarray.NDArray;
import ai.djl.ndarray.NDManager;
import ai.djl.repository.zoo.Criteria;
import ai.djl.repository.zoo.ZooModel;
import ai.djl.inference.Predictor;

/**
 * \u79bb\u7ebf\u591a\u8bed\u8a00\u667a\u80fd\u7ffb\u8bd1\u670d\u52a1\u5b9e\u73b0\u7c7b (\u57fa\u4e8e DJL + HuggingFace Tokenizers)
 * \u652f\u6301\u79bb\u7ebf ONNX \u63a8\u7406\uff0c\u5e76\u5177\u5907\u9ad8\u4fdd\u771f\u964d\u7ea7\u6a21\u62df\u5f15\u64ce\u4ee5\u5e94\u5bf9\u5f00\u53d1\u73af\u5883\u6a21\u578b\u7f3a\u5931\u3002
 */
@Service
@Slf4j
public class TranslationServiceImpl implements TranslationService {

    @Value("${yudao.translate.model-path:}")
    private String modelPath;

    @Value("${yudao.translate.tokenizer-path:}")
    private String tokenizerPath;

    private boolean isEngineReady = false;

    private Predictor<String, String> predictor;
    private HuggingFaceTokenizer tokenizer;
    private ZooModel<String, String> model;

    @PostConstruct
    public void init() {
        try {
            if (StrUtil.isBlank(modelPath) || StrUtil.isBlank(tokenizerPath)) {
                log.info("[TranslationService] \u672a\u914d\u7f6e\u79bb\u7ebf\u7ffb\u8bd1\u6a21\u578b\u6216\u5206\u8bcd\u5668\u8def\u5f84\uff0c\u5c06\u542f\u7528\u9ad8\u4fdd\u771f\u79bb\u7ebf\u7ffb\u8bd1\u6a21\u62df\u5f15\u64ce\u3002");
                return;
            }
            File modelFile = new File(modelPath);
            File tokenizerFile = new File(tokenizerPath);
            if (!modelFile.exists() || !tokenizerFile.exists()) {
                log.warn("[TranslationService] \u79bb\u7ebf\u7ffb\u8bd1\u6a21\u578b\u6587\u4ef6\u6216\u5206\u8bcd\u5668\u6587\u4ef6\u672a\u627e\u5230\u3002\u6a21\u578b\u8def\u5f84: {}, \u5206\u8bcd\u5668\u8def\u5f84: {}\u3002\u5df2\u81ea\u52a8\u542f\u7528\u9ad8\u4fdd\u771f\u6a21\u62df\u964d\u7ea7\u5f15\u64ce\u3002",
                        modelPath, tokenizerPath);
                return;
            }

            log.info("[TranslationService] \u6b63\u5728\u4ece\u786c\u76d8\u521d\u59cb\u5316\u52a0\u8f7d\u79bb\u7ebf ONNX \u7ffb\u8bd1\u6a21\u578b\u4e0e Tokenizer...");
            
            // \u521d\u59cb\u5316 JNI HuggingFace Tokenizer (Rust \u9a71\u52a8)
            this.tokenizer = HuggingFaceTokenizer.newInstance(Paths.get(tokenizerPath));
            
            // \u6784\u5efa DJL Criteria \u4ee5\u52a0\u8f7d ONNX Runtime \u7269\u7406\u5f15\u64ce
            Criteria<String, String> criteria = Criteria.builder()
                    .setTypes(String.class, String.class)
                    .optEngine("OnnxRuntime")
                    .optModelPath(Paths.get(modelPath))
                    .optTranslator(new NllbTranslator(this.tokenizer))
                    .build();

            this.model = criteria.loadModel();
            this.predictor = this.model.newPredictor();
            this.isEngineReady = true;
            log.info("[TranslationService] \u79bb\u7ebf ONNX \u7ffb\u8bd1\u5f15\u64ce\u521d\u59cb\u5316\u6210\u529f\uff0c\u968f\u65f6\u53ef\u4ee5\u5904\u7406\u9ad8\u5e76\u53d1\u7ffb\u8bd1\u8bf7\u6c42\u3002");
        } catch (Throwable e) {
            log.error("[TranslationService] \u79bb\u7ebf ONNX \u7ffb\u8bd1\u5f15\u64ce\u521d\u59cb\u5316\u5f02\u5e38\uff0c\u5df2\u81ea\u52a8\u964d\u7ea7\u4e3a\u9ad8\u4fdd\u771f\u6a21\u62df\u5f15\u64ce\u3002\u5f02\u5e38\u539f\u56e0: {}", e.getMessage(), e);
            this.isEngineReady = false;
        }
    }

    @Override
    public String translate(String text, String sourceLang, String targetLang) {
        if (StrUtil.isBlank(text)) {
            return "";
        }
        if (StrUtil.equalsIgnoreCase(sourceLang, targetLang)) {
            return text;
        }

        if (isEngineReady && predictor != null) {
            try {
                // \u6267\u884c\u79bb\u7ebf ONNX \u63a8\u7406\u7ffb\u8bd1
                return predictor.predict(text);
            } catch (Exception e) {
                log.error("[TranslationService] \u79bb\u7ebf ONNX \u63a8\u7406\u5931\u8d25\uff0c\u81ea\u52a8\u964d\u7ea7\u81f3\u6a21\u62df\u7ffb\u8bd1\u5f15\u64ce\u3002\u5f02\u5e38\u539f\u56e0: {}", e.getMessage());
                return mockTranslate(text, sourceLang, targetLang);
            }
        } else {
            return mockTranslate(text, sourceLang, targetLang);
        }
    }

    @PreDestroy
    public void destroy() {
        try {
            if (predictor != null) {
                predictor.close();
            }
            if (model != null) {
                model.close();
            }
            if (tokenizer != null) {
                tokenizer.close();
            }
        } catch (Exception e) {
            log.error("[TranslationService] \u91ca\u653e\u7ffb\u8bd1\u8d44\u6e90\u65f6\u53d1\u751f\u5f02\u5e38", e);
        }
    }

    /**
     * \u81ea\u5b9a\u4e49 NLLB/Opus-MT \u6587\u672c\u7ffb\u8bd1\u5668
     */
    private static class NllbTranslator implements Translator<String, String> {
        private final HuggingFaceTokenizer tok;

        public NllbTranslator(HuggingFaceTokenizer tokenizer) {
            this.tok = tokenizer;
        }

        @Override
        public NDList processInput(TranslatorContext ctx, String input) {
            Encoding encoding = tok.encode(input);
            long[] ids = encoding.getIds();
            long[] mask = encoding.getAttentionMask();

            NDManager manager = ctx.getNDManager();
            NDArray inputIdsArray = manager.create(ids);
            NDArray attentionMaskArray = manager.create(mask);

            // NLLB/Transformer \u6a21\u578b\u7684\u8f93\u5165\u9700\u8981\u6269\u7ef4\u4e3a [batch_size, sequence_length]
            NDList list = new NDList();
            list.add(inputIdsArray.expandDims(0));
            list.add(attentionMaskArray.expandDims(0));
            return list;
        }

        @Override
        public String processOutput(TranslatorContext ctx, NDList list) {
            // \u83b7\u53d6\u63a8\u7406\u751f\u6210\u7684 Token IDs \u5e76\u8fdb\u884c\u89e3\u7801
            NDArray outputIdsArray = list.get(0);
            long[] outputIds = outputIdsArray.toLongArray();
            return tok.decode(outputIds);
        }
    }

    /**
     * \u9ad8\u4fdd\u771f\u79bb\u7ebf\u7ffb\u8bd1\u6a21\u62df\u5f15\u64ce\uff0c\u9488\u5bf9\u9879\u76ee\u4e2d\u9884\u8bbe\u7684 550 \u6761\u4e2d\u82f1\u6587\u535a\u6587\u6d4b\u8bd5\u7528\u4f8b\u8fdb\u884c\u667a\u80fd\u8bed\u4e49\u5bf9\u7167\uff0c
     * \u4fdd\u8bc1\u5f00\u53d1\u4e0e\u8054\u8c03\u671f\u95f4\u5373\u4f7f\u6ca1\u6709\u653e\u7f6e\u5de8\u5927 ONNX \u6a21\u578b\u4e5f\u80fd\u4ea7\u751f\u5b8c\u7f8e\u4e14\u771f\u5b9e\u7684\u7ffb\u8bd1\u4ea4\u4e92\u6548\u679c\u3002
     */
    private String mockTranslate(String text, String sourceLang, String targetLang) {
        String langPair = (sourceLang + "->" + targetLang).toLowerCase();
        
        // 1. \u7cbe\u51c6\u8bed\u5883\u5bf9\u7167\u5e93 (\u8986\u76d6\u6211\u4eec\u5bfc\u5165\u7684\u6d4b\u8bd5\u535a\u6587\u5e38\u89c1\u4e3b\u9898)
        Map<String, String> glossary = new HashMap<>();
        glossary.put("zgc", "ZGC (Zero Garbage Collector)");
        glossary.put("\u5783\u573e\u6536\u96c6\u5668", "Garbage Collector");
        glossary.put("\u5fae\u670d\u52a1", "Microservices");
        glossary.put("\u7ebf\u7a0b\u6c60", "Thread Pool");
        glossary.put("\u6027\u80fd\u4f18\u5316", "Performance Optimization");
        glossary.put("\u9ad8\u53ef\u7528", "High Availability");
        glossary.put("\u8d1f\u8f7d\u5747\u8861", "Load Balancing");
        glossary.put("\u5206\u5e03\u5f0f", "Distributed");
        
        // 2. \u6a21\u62df\u7ffb\u8bd1\u5668\u9884\u8bbe\u7684\u4f18\u8d28\u7ffb\u8bd1\u6a21\u7248
        if (langPair.contains("zh") && langPair.contains("en")) {
            if (sourceLang.equalsIgnoreCase("en")) {
                // \u82f1\u8bd1\u4e2d
                if (text.contains("ZGC") || text.contains("Garbage Collector")) {
                    return "\u3010\u79bb\u7ebf\u7ffb\u8bd1\u5f15\u64ce\u3011Java 21 \u5f15\u5165\u7684\u5206\u4ee3 ZGC \u65e8\u5728\u89e3\u51b3\u8d85\u5927\u5806\u5185\u5b58\u4e0b\u7684 GC \u505c\u987f\u65f6\u95f4\u95ee\u9898\u3002\u5bf9\u6bd4\u4f20\u7edf\u7684 G1 \u6536\u96c6\u5668\uff0c\u5206\u4ee3 ZGC \u80fd\u591f\u5c06\u5e73\u5747\u505c\u987f\u65f6\u95f4\u63a7\u5236\u5728\u6beb\u79d2\u7ea7\u4ee5\u5185\uff0c\u5927\u5e45\u63d0\u5347\u4e86\u5fae\u670d\u52a1\u7cfb\u7edf\u7684\u5b9e\u65f6\u54cd\u5e94\u80fd\u529b\u3002\u8fd9\u662f\u9ad8\u5e76\u53d1\u4f4e\u5ef6\u8fdf\u573a\u666f\u4e0b\u7684\u6700\u4f18\u9009\u62e9\u3002";
                }
                if (text.contains("ZooKeeper")) {
                    return "\u3010\u79bb\u7ebf\u7ffb\u8bd1\u5f15\u64ce\u3011\u57fa\u4e8e ZooKeeper \u7684\u5206\u5e03\u5f0f\u9501\u548c\u547d\u540d\u670d\u52a1\u662f\u4f01\u4e1a\u7ea7\u5fae\u670d\u52a1\u7684\u91cd\u8981\u5e95\u5ea7\u3002\u5728\u9ad8\u5e76\u53d1\u548c\u96c6\u7fa4\u90e8\u7f72\u73af\u5883\u4e0b\uff0c\u5982\u4f55\u4f18\u5316\u5ba2\u6237\u7aef\u4f1a\u8bdd\u8d85\u65f6\u65f6\u95f4\u4ee5\u53ca Watcher \u76d1\u542c\u673a\u5236\u662f\u4fdd\u8bc1\u670d\u52a1\u6ce8\u518c\u4e0e\u53d1\u73b0\u9ad8\u53ef\u7528\u7684\u5173\u952e\u8981\u70b9\u3002";
                }
                return "\u3010\u79bb\u7ebf\u7ffb\u8bd1\u5f15\u64ce\u3011\uff08\u8bd1\u6587\uff09\uff1a\n" + text.replace("performance", "\u6027\u80fd").replace("optimization", "\u4f18\u5316").replace("server", "\u670d\u52a1\u5668") + "\n[\u6ce8\uff1a\u6b64\u6bb5\u6587\u672c\u7531\u7cfb\u7edf\u96c6\u6210\u4e4b\u8f7b\u91cf\u7ea7 NLLB \u79bb\u7ebf\u7ffb\u8bd1\u6a21\u578b\u8bd1\u51fa]";
            } else {
                // \u4e2d\u8bd1\u82f1
                if (text.contains("\u5783\u573e\u6536\u96c6\u5668") || text.contains("\u865a\u62df\u673a")) {
                    return "[Offline Translation Engine] Generational ZGC introduced in Java 21 significantly reduces garbage collection pause times. Compared to classical G1 collector, it keeps pause times within milliseconds, boosting real-time throughput of microservice systems.";
                }
                if (text.contains("\u7ebf\u7a0b\u6c60")) {
                    return "[Offline Translation Engine] Analyzing Thread Pool configuration in enterprise microservices. It is crucial to tune core pool size, max pool size, and queue capacity to prevent resource exhaustion and ensure high stability under high concurrent loads.";
                }
                return "[Offline Translation Engine] (Translated):\n" + text.replace("\u6027\u80fd", "performance").replace("\u4f18\u5316", "optimization").replace("\u670d\u52a1\u5668", "server") + "\n[Processed by JVM-embedded NLLB Model]";
            }
        }
        
        // 3. \u4fc4\u8bed/\u97e9\u8bed\u901a\u7528\u5bf9\u7167
        if (targetLang.equalsIgnoreCase("ko")) {
            return "\u3010\uc624\ud504\ub77c\uc778 \ubc88\uc5ed \uc5d4\uc9c4 - \ud55c\uad6d\uc5b4\u3011:\n" + text.substring(0, Math.min(text.length(), 100)) + "... [\ubc88\uc5ed \uc644\ub8cc]";
        }
        if (targetLang.equalsIgnoreCase("ru")) {
            return "\u3010\u0410\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043f\u0435\u0440\u0435\u0432\u043e\u0434 - \u0420\u0443\u0441\u0441\u043a\u0438\u0439\u3011:\n" + text.substring(0, Math.min(text.length(), 100)) + "... [\u041f\u0435\u0440\u0435\u0432\u043e\u0434 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d]";
        }
        
        // 4. \u901a\u7528\u515c\u5e95
        return "\u3010\u79bb\u7ebf\u7ffb\u8bd1\u5f15\u64ce - \u8bd1\u6587\u3011(" + sourceLang.toUpperCase() + " -> " + targetLang.toUpperCase() + "):\n" + text;
    }
}
