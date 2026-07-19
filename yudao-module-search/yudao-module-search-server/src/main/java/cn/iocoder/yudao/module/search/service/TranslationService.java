package cn.iocoder.yudao.module.search.service;

/**
 * 离线多语言智能翻译服务接口
 */
public interface TranslationService {

    /**
     * 离线翻译文本
     *
     * @param text       待翻译文本
     * @param sourceLang 源语言代码 (如: en, zh, ko, ru)
     * @param targetLang 目标语言代码 (如: en, zh, ko, ru)
     * @return 翻译后的文本
     */
    String translate(String text, String sourceLang, String targetLang);

}
