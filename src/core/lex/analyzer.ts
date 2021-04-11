import { beginBlockRegex } from "./regex"

import { IOLEXNode, IOLEXNodeTree } from "../../typings/node"
import { TextNodeMaker } from "./node"

/**
 * Tex语法分析器
 * @param tex 处理之后的Tex数组
 */
export const TexAnalyzer = (tex: Array<string>): Array<IOLEXNodeTree> => {
    /**
     * 1) 先分析特殊块, 比如begin、end、$$
     * 2) 都匹配不上的则为TextNode
     * 3) 当字符串处理最简单
     */
    let TexTree: Array<IOLEXNodeTree> = []


    for(let i = 0; i < tex.length; i++) {
        let resTmp: string | null = null

        if (beginBlockRegex.test(tex[i])) {
            continue
        }

        // 最后兜底为TextNode
        resTmp = TextNodeMaker(tex[i])
    }

    return TexTree
}
