import { corePackage } from "../packages/core"
import { makeNewOLEXError } from "./utils"

import { IOptions } from "../typings/options"
import { IPackage } from "../typings/packages"

/**
 * 默认配置项
 */
const defaultOpts: IOptions = {
    packages: [corePackage],
}

/**
 * 初始化宏包
 * @param opts 配置项
 */
export const setPackages = (
    opts: IOptions | undefined
): Array<string | IPackage> => {
    return []
}

/**
 * 设置配置项
 * @param opts 传入配置项
 */
export const setOptions = (opts: IOptions | undefined): IOptions => {
    if (!opts) {
        return defaultOpts
    }
    let options: IOptions = defaultOpts
    opts.packages?.forEach((pack) => {
        if (typeof pack === "string") {
            // 类型为字符串, 在window对象查找解析器
            if (!window) {
                // 全局变量不存在
                throw makeNewOLEXError("Global Variable window is not defined!")
            } else if (
                window[`OLEX_PACKAGE_${pack}`] &&
                !!window[`OLEX_PACKAGE_${pack}`].scope
            ) {
                // 注册全局合法包
            } else {
                // 全局包不合法
                throw makeNewOLEXError("Invalid Package!")
            }
        } else if (!!pack.scope) {
            // 宏包合法
            // 注册本地包
        } else {
            // 扔出使用包不合法
            throw makeNewOLEXError("Invalid Package!")
        }
    })
    return options
}

/**
 * 设置支持项
 */
export const setSupportedCommands = (
    opts: IOptions | undefined
): Set<string> => {
    if (!opts) {
        // 默认配置包支持
    }
    return new Set<string>()
}
