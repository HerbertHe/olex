import { PackageChecker, TexSplitter } from "./lexer"

const tex = `\\documnetclass{article}\n\\usepackage{sdfsfsdf}\n\\usepackage{9ubb}\n\\usepackage{example}`

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
        "\\documnetclass{article}\n" +
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
    ).toEqual([true, "", "\\documnetclass{article}\n\n\n"])
})

test("测试Tex分割器", () => {
    const afterCheker = PackageChecker(
        tex,
        new Map([
            [examplePackage.scope, examplePackage],
            ["sdfsfsdf", examplePackage],
            ["9ubb", examplePackage],
        ])
    )
    expect(TexSplitter(afterCheker[2] as string)).toEqual([
        "\\documnetclass{article}",
    ])
})
