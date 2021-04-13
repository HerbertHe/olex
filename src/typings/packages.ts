// 在此定义插件类型
import { ParsersType } from "./core"
import { IOLEXNodeTree } from "./node"

// 命令解析类型
export type CommandParsersType = ({
    command,
    options,
    group,
    value,
    children
}: IOLEXNodeTree) => string

/**
 * 宏包类型
 * @param {string} scope 作用域
 * @param {string} author 作者
 * @param {string} version 版本信息
 * @param {string} url 宏包仓库
 * @param {string} style 自定义样式
 * @param {Function} mount 宏包挂载生命周期
 * @param {any} parsers 解析器
 */
export interface IPackage {
    scope: string
    author: string
    version: string
    url: string
    style: string
    mount?: Function
    // documentclassParsers 文档类型宏解析器支持
    // beginEnvParsers: 自定义环境解析器支持
    // commandParsers: ParsersType 命令解析器支持
    parsers: ParsersType
}
