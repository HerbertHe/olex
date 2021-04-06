import { corePackage } from "../packages/core"
import { ifOptsPackage, makeNewOLEXError } from "./utils"

import { IOptions } from "../typings/options"
import { CommandParsersType, IPackage } from "../typings/packages"

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
): Map<string, IPackage> => {
    // 默认
    let packages: Map<string, IPackage> = new Map<string, IPackage>()
    const packagesDefaultArray = defaultOpts.packages as Array<IPackage>
    packagesDefaultArray.forEach((pack: IPackage) => {
        packages.set(pack.scope, pack)
    })

    if (!ifOptsPackage(opts) || !opts) {
        return packages
    }

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
                packages.set(
                    window[`OLEX_PACKAGE_${pack}`].scope as string,
                    window[`OLEX_PACKAGE_${pack}`] as IPackage
                )
            } else {
                // 全局包不合法
                throw makeNewOLEXError("Invalid Package!")
            }
        } else if (!!pack.scope) {
            // 宏包合法
            // 注册本地包
            packages.set(pack.scope, pack)
        } else {
            // 扔出使用包不合法
            throw makeNewOLEXError("Invalid Package!")
        }
    })
    return packages
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
    // 调用宏包整合函数
    options.packages = [...setPackages(opts).values()]
    return options
}

/**
 * 初始化支持解析器
 */
export const setParsers = (
    opts: IOptions | undefined
): Map<string, CommandParsersType> => {
    let parsers: Map<string, CommandParsersType> = new Map<
        string,
        CommandParsersType
    >()
    const packages = [...setPackages(opts).values()]
    packages.forEach((pack: IPackage) => {
        parsers = new Map([...parsers, ...pack.parsers])
    })
    return parsers
}

/**
 * 初始化支持的命令项
 */
export const setSupportedCommands = (
    opts: IOptions | undefined
): Set<string> => {
    let supportedCommands = new Set<string>()
    const packages = [...setPackages(opts).values()]
    packages.forEach((pack: IPackage) => {
        for (let key of pack.parsers.keys()) {
            supportedCommands.add(key)
        }
    })
    return supportedCommands
}
