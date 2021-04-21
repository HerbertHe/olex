import { Lexer, PackageChecker, CHAR_TYPE } from "./lexer"
import {
    tokenEscape,
    tokenComment,
    tokenSpace,
    tokenNewline,
    tokenSpecial,
    tokenAlphabet,
    tokenNumber,
    tokenUnicode,
} from "./tokenizer"

/**
 * TODO: 考虑干掉argArray这个参数
 */
interface ITree {
    mode: string
    name: string
    from: number
    to: null
    value: string
    argArray: Array<string>
    parent: null
    children: Array<null>
}

export class Syner {
    private innerTree: ITree | null = null
    private type: string = ""
    private value: string | number = ""
    private place: number = -1
    private mathEnv: string = "" // 未知用途参数
    private intabular: boolean = false
    private omispace: boolean = false // 省略空间

    private nodePlace: ITree | null = null
    private nodeLevel: number = 0
    private nodeArray: Array<null> = []

    initTree = () => {
        this.innerTree = {
            mode: "document",
            name: "tree",
            from: 0,
            to: null,
            value: "",
            argArray: [],
            parent: null,
            children: [],
        }
        this.nodePlace = this.innerTree
        this.nodeLevel = 0
        this.nodeArray = []
    }

    // 循环分析词法
    mainLoop = () => {
        switch (this.type) {
            case CHAR_TYPE.ESCAPE:
                tokenEscape.call(this)
                break
            // ...
            case CHAR_TYPE.COMMENT:
                tokenComment.call(this)
                break
            case CHAR_TYPE.SPACE:
                tokenSpace.call(this)
                break
            case CHAR_TYPE.NEWLINE:
                tokenNewline.call(this)
                break
            case CHAR_TYPE.SPECIAL:
                tokenSpecial.call(this)
                break
            case CHAR_TYPE.ALPHABET:
                tokenAlphabet.call(this)
                break
            case CHAR_TYPE.NUMBER:
                tokenNumber.call(this)
                break
            case CHAR_TYPE.UNICODE:
                tokenUnicode.call(this)
                break
        }
    }

    closeGroup = (pos: number) => {
        // Line 1965
        // let node = this.nodePlace, argType = node?.argTypes
    }

    analysis = (raw: string, modstart: number, modend: number) => {
        // 包检查器,过滤
        // const tex= PackageChecker()
        // 初始化词法分析器
        const lexer = new Lexer(raw, modstart, modend)
        // 初始化语法树
        this.initTree()
        this.mathEnv = ""
        this.omispace = false
        // 这里省略了, 设计了全新的架构
        // typejax.innersect = []
        // this.packages = packages
        // this.cmdvalues = latex.cmdvalues
        // this.counters = latex.counters
        // this.theorems = latex.theorems

        // this.openNewGroup("env", "par", modstart)

        while (!lexer.atLast()) {
            const { type, value, place } = lexer.nextToken()
            this.type = type
            this.value = value
            this.place = place
            this.mainLoop()
        }

        // this.closeOldMath(lexer.modend)
        while (this.nodeLevel > 0) {
            // this.closeGroup()
        }
    }
}
