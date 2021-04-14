import { IOptions } from "../typings/options"

export const makeNewOLEXError = (err: string) => {
    return new Error(`OLEX Error: ${err}`)
}

/**
 * 检查配置项包是否存在
 * @param opts 自定义配置项
 */
export const ifOptsPackage = (opts: IOptions | undefined): boolean => {
    if (!opts || !opts.packages) return false
    return true
}

/**
 * 判断当前是否处于浏览器环境
 */
export function ifBrowser(this: any): boolean {
    return this === window
}
