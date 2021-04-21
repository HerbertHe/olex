import { usepackageRegex } from "./regex"
import { makeNewOLEXError } from "../utils"

import { PackagesType } from "../../typings/core"
import { IOptions } from "../../typings/options"

type PackageCheckerType = Array<boolean | string>

/**
 * 包检查器
 * 过滤掉原文档中的包
 *
 * @param tex Tex源文件
 * @param opts 全局配置
 */
export const PackageChecker = (
    tex: string,
    packages: PackagesType
): PackageCheckerType => {
    if (!usepackageRegex.test(tex)) {
        // 没使用额外的包
        return [true, "", tex]
    }

    // 注意上面会改变lastIndex的位置, 需要进行重置
    usepackageRegex.lastIndex = 0

    const packsSet = new Set([...packages.keys()])

    let pack

    while ((pack = usepackageRegex.exec(tex)) !== null) {
        if (!packsSet.has(pack[3])) {
            return [false, pack[3], tex]
        }
    }

    return [true, "", tex.replace(usepackageRegex, "")]
}

/**
 * Tex分割器（已废弃）
 * @param tex Tex代码
 */
// export const TexSplitter = (tex: string) => {
//     return tex.split("\n").filter((item: string) => !!item)
// }

/**
 * 语法解析器
 * @param tex Tex源文件
 */
// export const OLEX_Lexer = (tex: string, opts: IOptions) => {
//     const packages = opts.packages as unknown
//     const afterCheck = PackageChecker(tex, packages as PackagesType)

//     if (opts.strict) {
//         if (!afterCheck[0]) {
//             // 宏包不被包含
//             throw makeNewOLEXError(`Unsupported Package: ${afterCheck[1]}`)
//         }
//     }

//     // Tex代码分割
//     const afterSplit = TexSplitter(afterCheck[2] as string)

//     // 进行匹配处理
//     return TexAnalyzer(afterSplit)
// }

export enum CHAR_TYPE {
    ESCAPE = "escape",
    COMMENT = "comment",
    SPACE = "space",
    NEWLINE = "newline",
    SPECIAL = "special",
    ALPHABET = "alphabet",
    NUMBER = "number",
    UNICODE = "unicode",
}

interface ITOKEN {
    type: string
    value: string
    place: number
}

export class Lexer {
    private raw: string
    private length: number
    private index: number
    private modEnd: number
    private ended: boolean = false
    constructor(raw: string, modStart: number, modEnd: number) {
        this.raw = raw
        this.length = raw.length
        this.index = modStart
        this.modEnd = modEnd
    }

    atLast = (): boolean => {
        return this.index >= this.length || this.ended === true
    }

    atEnding = () => {
        return this.index >= this.modEnd
    }

    // TODO: 可以考虑之后将数字和字符进行合并
    nextToken = (): ITOKEN => {
        let type = "",
            value = "",
            place = this.index
        if (this.atLast()) {
            return { type: "", value: "", place: this.length }
        }
        // if atEnding

        let curchar = this.raw.charAt(this.index)
        let nextchar = "",
            nextcode = 0,
            i = 0

        if (curchar === "\\") {
            type = CHAR_TYPE.ESCAPE
            value = "\\"
        } else if (curchar === "%") {
            type = CHAR_TYPE.COMMENT
            value = "%"
        } else if (curchar === " ") {
            type = CHAR_TYPE.SPACE
            value = " "
        } else if (curchar === "\n") {
            type = CHAR_TYPE.NEWLINE
            value = "\n"
        } else if (curchar === "\r") {
            nextchar = this.raw.charAt(this.index + 1)
            if (nextchar === "\n") {
                // 处理CRLF
                type = CHAR_TYPE.NEWLINE
                value = "\n"
                this.index += 1
            } else {
                // 处理CR
                type = CHAR_TYPE.NEWLINE
                value = "\n"
            }
        } else if (/[\!-\$&-\/\:-@\[-`\{-~]/.test(curchar)) {
            // 引用自typejax
            type = CHAR_TYPE.SPECIAL
            value = curchar
        } else if (/[a-zA-Z]/.test(curchar)) {
            i = this.index
            do {
                i += 1
                nextchar = this.raw.charAt(i)
            } while (/[a-zA-Z]/.test(nextchar))
            type = CHAR_TYPE.ALPHABET
            value = this.raw.substring(this.index, i)
            this.index = i - 1
        } else if (/[0-9]/.test(curchar)) {
            i = this.index
            do {
                i += 1
                nextchar = this.raw.charAt(i)
            } while (/[0-9]/.test(nextchar))
            type = CHAR_TYPE.NUMBER
            value = this.raw.substring(this.index, i)
            this.index = i - 1
        } else {
            i = this.index
            do {
                i += 1
                nextcode = this.raw.charCodeAt(i)
            } while (nextcode > 127)
            type = CHAR_TYPE.UNICODE
            value = this.raw.substring(this.index, i)
            this.index = i - 1
        }
        this.index += 1
        return { type, value, place }
    }

    goBack = (i: number) => {
        this.index -= i
    }
}
