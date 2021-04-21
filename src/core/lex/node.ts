import { ITree } from "./analyzer"
// import { IOLEXNode } from "../../typings/node"

/**
 * 文本节点构造器
 * @param text 文本值
 */
// export const TextNodeMaker = (text: string): string => {
//     return JSON.stringify({
//         command: "TextNode",
//         options: null,
//         group: null,
//         value: text,
//     } as IOLEXNode)
// }

/**
 * 行内数学公式节点构造器
 * @param latex 数学公式值
 */
// export const InlineMathNodeMarker = (latex: string): string => {
//     return JSON.stringify({
//         command: "InlineMathNode",
//         options: null,
//         group: null,
//         value: latex,
//     } as IOLEXNode)
// }

export const createTextNode = (node: ITree) => {
    // 不是根节点
    if (
        node.mode !== "root" &&
        node.name !== "bmath" &&
        node.name !== "imath"
    ) {
        const TextNode: ITree = {
            type: "env",
            name: "itext",
            mode: "inline",
            from: node.from,
            to: -1,
            value: "",
            parent: node,
            children: [],
        }
        node.children.push(TextNode)
    }
}
