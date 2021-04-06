import { IPackage } from "../typings/packages"
import { IOptions } from "../typings/options"

import { setOptions, setPackages, setSupportedCommands } from "./init"

class OLEX {
    private _packages: Array<string | IPackage> = []
    private _cleanPackages: Array<string | IPackage> = []
    private _options: IOptions = {}
    private _supportedCommands: Set<string> = new Set<string>()

    // 初始化参数
    constructor(opts?: IOptions) {
        this._packages = setPackages(opts)
        this._options = setOptions(opts)
        this._supportedCommands = setSupportedCommands(opts)
    }

    // 链式注册宏包
    use = (pack: IPackage) => {
        // 注册宏包
        this._packages.push(pack)
        // 注册解析器
        // 注册command
    }

    // 打印所有的宏包信息
    showPackages = () => {
        return this._packages
    }

    // 检查宏包信息
    checkPackages = () => {}

    // 检查支持的类型
    checkSupported = () => {
        return this._supportedCommands
    }

    // 输出结果
    export = () => {}
}

export default OLEX
