import {
    PackagesType,
    ParsersType,
    SupportedCommandsType,
} from "../../typings/core"
import { IPackage } from "../../typings/packages"

export const usePackage = (
    pack: IPackage,
    packages: PackagesType,
    parsers: ParsersType,
    commands: SupportedCommandsType
): [PackagesType, ParsersType, SupportedCommandsType] => {
    // 包挂载
    packages.set(pack.scope, pack)

    // 命令注册
    for (let key of pack.parsers.keys()) {
        commands.add(key)
    }

    // 解析器注册
    parsers = new Map([...parsers, ...pack.parsers])

    return [packages, parsers, commands]
}
