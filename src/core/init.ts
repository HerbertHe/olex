import { corePackage } from "../packages/core"
import { ifOptsPackage, makeNewOLEXError } from "./utils"

import { IOptions } from "../typings/options"
import { CommandParsersType, IPackage } from "../typings/packages"
import {
    PackagesType,
    ParsersType,
    SupportedCommandsType,
} from "../typings/core"

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
const setPackages = (opts: IOptions | undefined): PackagesType => {
    // 默认
    let packages: PackagesType = new Map<string, IPackage>()
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
 * @param packages 初始化之后的包
 */
const setOptions = (
    opts: IOptions | undefined,
    packages: Array<IPackage>
): IOptions => {
    if (!opts) {
        return defaultOpts
    }
    let options: IOptions = defaultOpts
    // 调用宏包整合函数
    options.packages = packages
    return options
}

/**
 * 初始化网页样式渲染
 * @param opts 配置项
 */
export const setStyle = (
    container: string | undefined,
    opts: IOptions | undefined
): void => {
    // 没有设置容器, 或者为"", 或者不存在节点时
    if (!container || !document.getElementById(container)) {
        return
    }

    const packages = [...setPackages(opts).values()]
    packages.forEach((pack: IPackage) => {
        if (!!pack.style && !document.getElementById(pack.scope)) {
            const cssDOM = document.createElement("link")
            cssDOM.id = `olex-packages-style-${pack.scope}`
            cssDOM.href = pack.style
            cssDOM.rel = "stylesheet"
            cssDOM.type = "text/css"
            document.head.appendChild(cssDOM)
        }
    })
}

/**
 * 初始化函数
 */
export const initialize = (
    container: string | undefined,
    opts: IOptions | undefined
): [IOptions, SupportedCommandsType, PackagesType, ParsersType] => {
    const packages = setPackages(opts)
    const packagesArray = [...packages.values()]
    const options = setOptions(opts, packagesArray)

    let supportedCommands: SupportedCommandsType = new Set<string>()
    let parsers: ParsersType = new Map<string, CommandParsersType>()

    packagesArray.forEach((pack: IPackage) => {
        for (let key of pack.parsers.keys()) {
            supportedCommands.add(key)
        }

        parsers = new Map([...parsers, ...pack.parsers])
    })

    // 设置样式
    setStyle(container, opts)

    return [options, supportedCommands, packages, parsers]
}
