import { OLEX } from "./index"

const testPackage = {
    scope: "test",
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
    ]),
}

// 测试core代码
// test("测试打印单一配置项", () => {
//     console.log(testOLEX.showOption("package"))
// })

// test("测试打印配置项", () => {
//     console.log(testOLEX.showOptionsAll())
// })

// test("测试打印单一宏包信息", () => {
//     expect(testOLEX.showPackage("olex-core").scope).toBe("olex-core")
// })

// test("测试打印所有宏包信息", () => {
//     console.log(testOLEX.showPackagesAll())
// })

// test("测试打印支持的类型", () => {
//     // console.log(testOLEX.showSupported())
//     expect(testOLEX.showSupported("documentclass")).toBe(true)
//     expect(testOLEX.showSupported("sdfvr")).toBe(false)
// })

// test("测试打印输出", () => {
//     console.log(testOLEX.export())
// })

test("测试链式包注册", () => {
    const testOLEX = new OLEX({ tex: "" })
    testOLEX.use(testPackage)
    console.log(testOLEX.showPackagesAll())
})

// test("测试包初始化注册报错", () => {
//     const testOLEX = new OLEX({
//         tex: "",
//         opts: {
//             packages: ["34234"],
//         },
//     })
// })

// test("测试渲染函数报错", () => {
//     const testOLEX = new OLEX({ tex: "", container: "dsd" })
//     testOLEX.render()
// })
