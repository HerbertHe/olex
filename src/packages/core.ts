import OLEX from "../core"
import { CommandParsersType, IPackage } from "../typings/packages"

function mount(this: OLEX) {
    this.setContextVariable("测试", "自定义上下文参数")
    // console.log(this._context)
    console.log(this.getContextVariable("测试"))
}

// 核心解析器
export const corePackage: IPackage = {
    scope: "olex-core",
    author: "Herbert He",
    version: "latest",
    style: "",
    url: "default",
    mount: mount,
    parsers: new Map<string, CommandParsersType>([
        [
            "documentclass",
            () => {
                return "测试documentclass"
            },
        ],
    ]),
}
