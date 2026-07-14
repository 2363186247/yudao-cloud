package cn.iocoder.yudao.module.search.framework.utils;

import cn.hutool.core.util.StrUtil;
import com.huaban.analysis.jieba.JiebaSegmenter;
import com.huaban.analysis.jieba.SegToken;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 中文分词工具类 (基于 Jieba 分词)
 */
public class SegmentationUtils {

    private static final JiebaSegmenter SEGMENTER = new JiebaSegmenter();

    /**
     * 对文本进行分词，并用空格分隔返回字符串
     *
     * @param text 待分词文本
     * @return 空格分隔的分词结果
     */
    public static String segment(String text) {
        if (StrUtil.isBlank(text)) {
            return "";
        }
        List<SegToken> tokens = SEGMENTER.process(text, JiebaSegmenter.SegMode.SEARCH);
        return tokens.stream()
                .map(token -> token.word)
                .filter(StrUtil::isNotBlank)
                .collect(Collectors.joining(" "));
    }

    /**
     * 对文本进行分词，返回分词列表 (去重且过滤空白词)
     *
     * @param text 待分词文本
     * @return 分词列表
     */
    public static List<String> segmentToList(String text) {
        if (StrUtil.isBlank(text)) {
            return Collections.emptyList();
        }
        List<SegToken> tokens = SEGMENTER.process(text, JiebaSegmenter.SegMode.SEARCH);
        return tokens.stream()
                .map(token -> token.word)
                .filter(StrUtil::isNotBlank)
                .distinct()
                .collect(Collectors.toList());
    }

}
