import { OLEX } from "./index"

const testOLEX = new OLEX("")

// 测试core代码
// test("测试打印单一配置项", () => {
//     console.log(testOLEX.showOption("package"))
// })

// test("测试打印配置项", () => {
//     console.log(testOLEX.showOptionsAll())
// })

test("测试打印单一宏包信息", () => {
    expect(testOLEX.showPackage("olex-core").scope).toBe("olex-core")
})

// test("测试打印所有宏包信息", () => {
//     console.log(testOLEX.showPackagesAll())
// })

test("测试打印支持的类型", () => {
    // console.log(testOLEX.showSupported())
    expect(testOLEX.showSupported("documentclass")).toBe(true)
    expect(testOLEX.showSupported("sdfvr")).toBe(false)
})

// test("测试打印输出", () => {
//     console.log(testOLEX.export())
// })
