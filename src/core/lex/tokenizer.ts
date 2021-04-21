import { Syner } from "./analyzer"
import { CHAR_TYPE, Lexer } from "./lexer"

/**
 * 处理 \ token
 * @param this 对象指针
 * @param lexer 词法分析器实例
 */
export function tokenEscape(this: Syner | any, lexer: Lexer) {
    // this.closeEmpty(this.place)
    // this.omitspace = false
    const { type, value, place } = lexer.nextToken()
    this.type = type
    this.value = value
    this.place = place
    // TODO type为空的时候
    if (type === "") {
        // BUG 处理addText
        this.addText("\\", this.place - 1)
        return
    }

    switch (type) {
        case CHAR_TYPE.ESCAPE:
            if (this.mathEnv !== "") {
                // TODO mathEnv不为空
                this.addText("\\\\", this.place - 1)
            } else if (this.intabular) {
                // TODO 制表
            } else {
                // TODO 硬换行???
                this.addText("<br>", this.place - 1)
            }
            break
        case CHAR_TYPE.COMMENT:
            this.addText("%", this.place - 1)
            break
        case CHAR_TYPE.SPACE:
        case CHAR_TYPE.NEWLINE:
            // 处理回车或者换行
            this.addText(" ", this.place - 1)
            break
        case CHAR_TYPE.SPECIAL:
            // 处理特殊字符
            switch (value) {
                case "#":
                case "&":
                case "$":
                case "_":
                case "{":
                case "}":
                    if (this.mathEnv !== "") {
                        // mathEnv不为空
                        this.addText(`\\${value}`, this.place - 1)
                    } else {
                        this.addText(value, this.place - 1)
                    }
                    break
                case ";":
                    if (this.mathEnv !== "") {
                        this.addText(`\\${value}`, this.place - 1)
                    } else {
                        // BUG thickspace???
                        // this.addText()
                    }
                    break
                case ":":
                    if (this.mathEnv !== "") {
                        this.addText(`\\${value}`, this.place - 1)
                    } else {
                        // BUG medspace?
                    }
                    break
                case ",":
                    if (this.mathEnv !== "") {
                        this.addText(`\\${value}`, this.place - 1)
                    } else {
                        // BUG thinspace
                    }
                    break
                case "(":
                    if (this.mathEnv !== "") {
                        // BUG group??
                        this.closeGroup(this.place - 1)
                    }
                    this.openNewGroup("env", "imath", this.place - 1)
                    this.mathEnv = "()"
                    break
                case ")":
                    if (this.mathEnv === "()") {
                        this.closeGroup(this.place + 1)
                    } else if (this.mathEnv !== "") {
                        this.closeGroup(this.place + 1)
                        this.addText("\\)", this.place - 1)
                    } else {
                        this.addText("\\)", this.place - 1)
                    }
                    this.mathEnv = ""
                    break
                case "[":
                    if (this.mathEnv !== "") {
                        this.closeGroup(this.place - 1)
                    }
                    this.openNewGroup("env", "bmath", this.place - 1)
                    this.mathEnv = "[]"
                    break
                case "]":
                    if (this.mathEnv === "[]") {
                        this.closeGroup("env", "bmath", this.place + 1)
                    } else if (this.mathEnv !== "") {
                        this.closeGroup("env", "bmath", this.place + 1)
                        this.addText("\\]", this.place - 1)
                    } else {
                        this.addText("\\]", this.place - 1)
                    }
                    this.mathEnv = ""
                    break
                default:
                    this.addText(`\\${value}`, this.place - 1)
                    break
            }
            break
        case CHAR_TYPE.ALPHABET:
            let csname = this.value
            const { value: nval } = lexer.nextToken()
            if (nval === "*") {
                csname += "*"
            } else {
                // BUG ?
                lexer.goBack(nval.length)
            }

            if (this.mathEnv === "") {
                // BUG ???
                this.omitspace = true
            }

            switch (csname) {
                // TODO 处理command, 这里要调整架构 Line 1327~
                case "begin":
                case "end":
                    break
                case "documentclass":
                    break
            }
            break
        default:
            // this.addText(`\\${csname}`)
            // BUG csname的作用域问题
            break
    }
}

export function tokenComment(this: any, lexer: Lexer) {}
export function tokenSpace(this: any, lexer: Lexer) {}
export function tokenNewline(this: any, lexer: Lexer) {}
export function tokenSpecial(this: any, lexer: Lexer) {}
export function tokenAlphabet(this: any, lexer: Lexer) {}
export function tokenNumber(this: any, lexer: Lexer) {}
export function tokenUnicode(this: any, lexer: Lexer) {}
