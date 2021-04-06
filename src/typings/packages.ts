// 在此定义插件类型

// 命令解析类型
export type CommandParsersType = () => string

/**
 * 宏包类型
 * @param {string} scope 作用域
 * @param {string} author 作者
 * @param {string} version 版本信息
 * @param {string} url 宏包仓库
 * @param {string} style 自定义样式
 * @param {any} parsers 解析器
 */
export interface IPackage {
    scope: string
    author: string
    version: string
    url: string
    style: string
    parsers: Map<string, CommandParsersType>
}
