import { OLEX } from "./index"

const testOLEX = new OLEX()

// 测试core代码
test("测试打印单一配置项", () => {
    console.log(testOLEX.showOption("package"))
})

test("测试打印配置项", () => {
    console.log(testOLEX.showOptionsAll())
})

test("测试打印单一宏包信息", () => {
    console.log(testOLEX.showPackage("olex-core"))
})

test("测试打印所有宏包信息", () => {
    console.log(testOLEX.showPackagesAll())
})

test("测试打印支持的类型", () => {
    console.log(testOLEX.showSupported())
    console.log(testOLEX.showSupported("documentclass"))
})
