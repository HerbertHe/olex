import { CommandParsersType, IPackage } from "../typings/packages"
import { IOptions } from "../typings/options"
import {
    PackagesType,
    ParsersType,
    SupportedCommandsType,
} from "../typings/core"
import { version } from "../../package.json"

import { mount } from "./lifecycle/mount"

import { initialize } from "./init"
import { checkPackageInfo } from "./packages"
import { usePackage } from "./chain/use"
import { OLEX_Lexer } from "./lex/lexer"
import { OLEX_Parser } from "./parse/parser"
import { ifBrowser, makeNewOLEXError } from "./utils"

interface IOLEXConstructor {
    tex: string
    container?: string
    opts?: IOptions
}

class OLEX {
    private _tex: string = ""
    private _container: string | undefined = ""
    private _options: IOptions = {}
    // 上下文参数
    private _context: Map<string, any> = new Map<string, any>()
    private _packages: PackagesType = new Map<string, IPackage>()
    private _parsers: ParsersType = new Map<string, CommandParsersType>()
    private _supportedCommands: SupportedCommandsType = new Set<string>()
    private readonly _version = version

    // 初始化参数
    constructor({ tex, container, opts }: IOLEXConstructor) {
        this._tex = tex
        this._container = container
        const [options, supportedCommands, packages, parsers] = initialize(
            container,
            opts
        )
        this._packages = packages
        this._parsers = parsers
        this._options = options
        this._supportedCommands = supportedCommands

        // 新增挂载生命周期进行宏包的mount
        mount(this, this._packages)
    }

    // 链式注册宏包
    use = (pack: IPackage) => {
        const [packages, parsers, commands] = usePackage(
            this,
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
        return [...this._packages.keys()]
    }

    // 打印支持的命令
    showSupported = (command?: string): Array<string> | boolean => {
        if (!command) {
            return [...this._supportedCommands]
        } else {
            return this._supportedCommands.has(command)
        }
    }

    // 打印版本信息
    version = (): string => {
        return this._version
    }

    // 检查宏包信息, 包含宏包版本更新等
    checkPackage = (packName: string) => {
        const pack = this.showPackage(packName)
        checkPackageInfo(pack)
    }

    /**
     * 自定义上下文参量
     * @param scope 宏包作用域
     * @param name 参数名
     * @param value 参数值
     */
    setContextVariable = (scope: string, name: string, value: any) => {
        this._context.set(`${scope}-${name}`, value)
    }
    /**
     * 获取自定义的上下文参量
     * @param scope 宏包作用域
     * @param name 参数名
     */
    getContextVariable = (scope: string, name: string) => {
        return this._context.get(`${scope}-${name}`)
    }

    // 输出结果
    export = () => {
        const TexTree = OLEX_Lexer(this._tex, this._options)
        const result = OLEX_Parser(
            TexTree,
            this._parsers,
            this._supportedCommands,
            this._options
        )
        console.log(result)
    }

    // 网页渲染
    render = () => {
        if (!!this._container) {
            if (!!ifBrowser()) {
                // 浏览器环境
                // 获取盒子渲染
                const containerBox = document.getElementById(this._container)
                // console.log(window)
            } else {
                throw makeNewOLEXError(
                    "The render function only can be used in Browser Environment!"
                )
            }
        } else {
            throw makeNewOLEXError("Container has not been set!")
        }
    }
}

export default OLEX
