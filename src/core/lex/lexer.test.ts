import { PackageChecker, Lexer } from "./lexer"

const tex = `\\documentclass{article}\n\\usepackage{sdfsfsdf}\n\\usepackage{9ubb}\n\\usepackage{example}`

const examplePackage = {
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
        [
            "9ubb",
            () => {
                return "dsdsd"
            },
        ],
    ]),
}

test("测试包检查器拦截错误", () => {
    expect(
        PackageChecker(tex, new Map([[examplePackage.scope, examplePackage]]))
    ).toEqual([
        false,
        "sdfsfsdf",
        "\\documentclass{article}\n" +
            "\\usepackage{sdfsfsdf}\n" +
            "\\usepackage{9ubb}\n" +
            "\\usepackage{example}",
    ])
})

test("测试包检查器正确", () => {
    expect(
        PackageChecker(
            tex,
            new Map([
                [examplePackage.scope, examplePackage],
                ["sdfsfsdf", examplePackage],
                ["9ubb", examplePackage],
            ])
        )
    ).toEqual([true, "", "\\documentclass{article}\n\n\n"])
})

test("测试词法分析器", () => {
    const testFunc = () => {
        const lexer = new Lexer(tex, 0, tex.length)
        let ans = []
        while (tex.length) {
            const res = lexer.nextToken()
            ans.push(res)
            if (res.place === tex.length) break
        }
        return ans
    }
    expect(testFunc()).toEqual([
        { type: "escape", value: "\\", place: 0 },
        { type: "alphabet", value: "documentclass", place: 1 },
        { type: "special", value: "{", place: 14 },
        { type: "alphabet", value: "article", place: 15 },
        { type: "special", value: "}", place: 22 },
        { type: "newline", value: "\n", place: 23 },
        { type: "escape", value: "\\", place: 24 },
        { type: "alphabet", value: "usepackage", place: 25 },
        { type: "special", value: "{", place: 35 },
        { type: "alphabet", value: "sdfsfsdf", place: 36 },
        { type: "special", value: "}", place: 44 },
        { type: "newline", value: "\n", place: 45 },
        { type: "escape", value: "\\", place: 46 },
        { type: "alphabet", value: "usepackage", place: 47 },
        { type: "special", value: "{", place: 57 },
        { type: "number", value: "9", place: 58 },
        { type: "alphabet", value: "ubb", place: 59 },
        { type: "special", value: "}", place: 62 },
        { type: "newline", value: "\n", place: 63 },
        { type: "escape", value: "\\", place: 64 },
        { type: "alphabet", value: "usepackage", place: 65 },
        { type: "special", value: "{", place: 75 },
        { type: "alphabet", value: "example", place: 76 },
        { type: "special", value: "}", place: 83 },
        { type: "", value: "", place: 84 },
    ])
})
