import { Lexer, PackageChecker, CHAR_TYPE } from "./lexer"
import { createTextNode } from "./node"
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
export interface ITree {
    type?: string // ? 参数类型
    mode: string
    name: string
    from: number
    to: number | null
    value: string
    parent: ITree | null
    children: Array<ITree>
    argArray?: Array<string>
    argType?: Array<null>
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
            mode: "root",
            name: "root",
            from: 0,
            to: null,
            value: "",
            argArray: [],
            argType: [],
            parent: null,
            children: [],
        }
        this.nodePlace = this.innerTree
        this.nodeLevel = 0
        this.nodeArray = []
    }

    appendValue = (node: ITree | any, value: string, pos: number) => {
        if (!node) {
            // BUG node错误
            return
        }

        // 没有子节点则判断为文本节点
        if (node.children.length === 0) {
            createTextNode(node)
        }

        // 如果是数学公式
        if (node.name === "bmath" || node.name === "imath") {
            node.value += value
        } else if (node.mode === "block" || node.mode === "inline") {
            // BUG 节点模式为块级或者行内, 值追加？
            node.children[node.children.length - 1].value += value
        }
    }

    appendText = (value: string, pos: number) => {
        let node = this.nodePlace
        this.appendValue(node, value, pos)
    }

    addText = (value: string, pos: number) => {
        let n = value.length
        let node = this.nodePlace
        // BUG 未知参数argArray
        if (node?.argArray.length === node?.argType.length) {
            this.appendText(value, pos)
        } else {
            let i = node?.argArray?.length
            while(i < node?.argType?.length && value) {

            }
        }
    }

    // 循环分析词法
    mainLoop = (lexer: Lexer) => {
        switch (this.type) {
            case CHAR_TYPE.ESCAPE:
                tokenEscape.call(this, lexer)
                break
            case CHAR_TYPE.COMMENT:
                tokenComment.call(this, lexer)
                break
            case CHAR_TYPE.SPACE:
                tokenSpace.call(this, lexer)
                break
            case CHAR_TYPE.NEWLINE:
                tokenNewline.call(this, lexer)
                break
            case CHAR_TYPE.SPECIAL:
                tokenSpecial.call(this, lexer)
                break
            case CHAR_TYPE.ALPHABET:
                tokenAlphabet.call(this, lexer)
                break
            case CHAR_TYPE.NUMBER:
                tokenNumber.call(this, lexer)
                break
            case CHAR_TYPE.UNICODE:
                tokenUnicode.call(this, lexer)
                break
        }
    }

    closeGroup = (pos: number) => {
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
            this.mainLoop(lexer)
        }

        // this.closeOldMath(lexer.modend)
        while (this.nodeLevel > 0) {
            // this.closeGroup()
        }
    }
}
