import { CommandParsersType, IPackage } from "../typings/packages"
import { IOptions } from "../typings/options"
import {
    PackagesType,
    ParsersType,
    SupportedCommandsType,
} from "../typings/core"

import { initialize } from "./init"
import { checkPackageInfo } from "./packages"
import { usePackage } from "./chain/use"

class OLEX {
    private _tex: string = ""
    private _packages: PackagesType = new Map<string, IPackage>()
    private _parsers: ParsersType = new Map<string, CommandParsersType>()
    private _options: IOptions = {}
    private _supportedCommands: SupportedCommandsType = new Set<string>()

    // 初始化参数
    constructor(tex: string, container?: string, opts?: IOptions) {
        this._tex = tex
        const [options, supportedCommands, packages, parsers] = initialize(
            container,
            opts
        )
        this._packages = packages
        this._parsers = parsers
        this._options = options
        this._supportedCommands = supportedCommands
    }

    // 链式注册宏包
    use = (pack: IPackage) => {
        const [packages, parsers, commands] = usePackage(
            pack,
            this._packages,
            this._parsers,
            this._supportedCommands
        )

        this._packages = packages
        this._parsers = parsers
        this._supportedCommands = commands
    }

    // 打印单一配置信息
    showOption = (optName: string) => {
        return this._options[optName]
    }

    // 打印所有配置信息
    showOptionsAll = () => {
        return this._options
    }

    // 打印单一宏包信息
    showPackage = (packName: string): IPackage => {
        return this._packages.get(packName) as IPackage
    }

    // 打印所有的宏包信息
    showPackagesAll = () => {
        return this._packages
    }

    // 打印支持的类型
    showSupported = (command?: string): Set<string> | boolean => {
        if (!command) {
            return this._supportedCommands
        } else {
            return this._supportedCommands.has(command)
        }
    }

    // 检查宏包信息, 包含宏包版本更新等
    checkPackage = (packName: string) => {
        const pack = this.showPackage(packName)
        checkPackageInfo(pack)
    }

    // 输出结果
    export = () => {
        console.log(this._parsers)
    }
}

export default OLEX
