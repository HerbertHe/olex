import { PackagesType } from "../../typings/core"

type PackageCheckerType = Array<boolean | string>

import { usepackageRegex } from "./regex"

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
 * 语法解析器
 * @param tex Tex源文件
 */
export const OLEX_Lexer = (tex: string) => {}
