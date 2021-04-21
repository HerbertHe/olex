import katex from "katex"

// 实验中~~

/**
 * 渲染数学公式块内容
 * @param tex 数学公式
 */
export const renderMath = (tex: string) => {
    // 处理错误
    return katex.renderToString(tex, {
        throwOnError: false,
    })
}
