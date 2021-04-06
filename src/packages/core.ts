import { CommandParsersType, IPackage } from "../typings/packages"

// 核心解析器
export const corePackage: IPackage = {
    scope: "olex-core",
    author: "Herbert He",
    version: "latest",
    style: "",
    url: "default",
    parsers: new Map<string, CommandParsersType>([
        [
            "documentclass",
            () => {
                return "测试documentclass"
            },
        ],
    ]),
}
