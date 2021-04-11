import { IOLEXNode } from "../../typings/node";

/**
 * 文本节点构造器
 * @param text 文本值
 */
export const TextNodeMaker = (text: string): IOLEXNode => {
    return {
        command: "TextNode",
        options: null,
        group: null,
        value: text
    }
}

/**
 * 行内数学公式节点构造器
 * @param latex 数学公式值
 */
export const InlineMathNodeMarker = (latex: string): IOLEXNode => {
    return {
        command: "InlineMathNode",
        options: null,
        group: null,
        value: latex
    }
}
