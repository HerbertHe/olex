import { IPackage } from "../src"

const examplePackage: IPackage = {
    scope: "example",
    author: "HerbertHe",
    version: "v0.0.1",
    url: "",
    style: "",
    parsers: new Map([
        [
            "test",
            () => {
                return "test测试"
            },
        ],
        [
            "hhah",
            () => {
                return "哈哈哈"
            },
        ],
    ]),
}

export default examplePackage
