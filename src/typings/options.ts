import { IPackage } from "./packages"

/**
 * 配置项类型定义
 * @param {Array<string | IPackage>} packages
 */
export interface IOptions {
    [index: string]: any

    packages?: Array<string | IPackage>
}
