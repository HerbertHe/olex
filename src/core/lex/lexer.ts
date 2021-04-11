import { usepackageRegex } from "./regex"
import { makeNewOLEXError } from "../utils"

import { PackagesType } from "../../typings/core"
import { IOptions } from "../../typings/options"
import { TexAnalyzer } from "./analyzer"

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
 * Tex分割器
 * @param tex Tex代码
 */
export const TexSplitter = (tex: string) => {
    return tex.split("\n").filter((item: string) => !!item)
}

/**
 * 语法解析器
 * @param tex Tex源文件
 */
export const OLEX_Lexer = (tex: string, opts: IOptions) => {
    const packages = opts.packages as unknown
    const afterCheck = PackageChecker(tex, packages as PackagesType)

    if (opts.strict) {
        if (!afterCheck[0]) {
            // 宏包不被包含
            throw makeNewOLEXError(`Unsupported Package: ${afterCheck[1]}`)
        }
    }

    // Tex代码分割
    const afterSplit = TexSplitter(afterCheck[2] as string)

    // 进行匹配处理
    return TexAnalyzer(afterSplit)
}
