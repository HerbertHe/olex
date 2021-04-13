import { TexAnalyzer } from "./analyzer"

const texTest: Array<string> = [
    "\\dcoumentclass{article}",
    "\\author{惒泊}",
    "\\begin{document}",
    "Hello world!",
    "end{document}",
]

test("测试Tex语法分析器", () => {
    console.log(TexAnalyzer(texTest))
})
