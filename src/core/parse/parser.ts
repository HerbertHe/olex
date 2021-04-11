import { ParsersType, SupportedCommandsType } from "../../typings/core"
import { IOLEXNodeTree } from "../../typings/node"
import { IOptions } from "../../typings/options"

/**
 * OLEX渲染器
 * @param tree Tex语法树
 * @param parsers 注册解析器
 */
export const OLEX_Parser = (
    tree: Array<IOLEXNodeTree>,
    parsers: ParsersType,
    commands: SupportedCommandsType,
    opts: IOptions
) => {
    // 进行支持的命令检查
    // 进行严格性报错检查
    return
}
