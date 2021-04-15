import OLEX from ".."
import {
    PackagesType,
    ParsersType,
    SupportedCommandsType,
} from "../../typings/core"
import { IPackage } from "../../typings/packages"

import { update } from "../lifecycle/update"

/**
 * 链式注册宏包
 * @param pack 包
 * @param packages 对象包合集
 * @param parsers 解析器
 * @param commands 对象支持的命令
 */
export const usePackage = (
    that: OLEX,
    pack: IPackage,
    packages: PackagesType,
    parsers: ParsersType,
    commands: SupportedCommandsType
): [PackagesType, ParsersType, SupportedCommandsType] => {
    // 包检查
    // 包挂载
    packages.set(pack.scope, pack)

    // 命令注册
    for (let key of pack.parsers.keys()) {
        commands.add(key)
    }

    // 解析器注册
    parsers = new Map([...parsers, ...pack.parsers])

    // 更新对象属性
    update(that)

    return [packages, parsers, commands]
}
