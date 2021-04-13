import OLEX from "../core"
import { CommandParsersType, IPackage } from "../typings/packages"

const scope = "olex-core"

/**
 * 挂载生命周期
 * @param this OLEX对象实例指针
 */
function mount(this: OLEX) {
    this.setContextVariable(scope, "测试", "自定义上下文参数测试")
    console.log(this.getContextVariable(scope, "测试"))
}

// 核心解析器
export const corePackage: IPackage = {
    scope,
    author: "Herbert He",
    version: "latest",
    style: "",
    url: "",
    mount,
    parsers: new Map<string, CommandParsersType>([
        [
            "documentclass",
            () => {
                return "测试documentclass"
            },
        ],
    ]),
}
