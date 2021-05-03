import OLEX from ".."
import { PackagesType } from "../../typings/core"
import { IPackage } from "../../typings/packages"

/**
 * 宏包初始化参数挂载生命周期
 * @param that 上游this指针
 * @param packages 已注册包
 */
export const mount = (that: OLEX, packages: PackagesType): void => {
    ;[...packages.values()].forEach((item: IPackage) => {
        if (!!item.mount) {
            // 实例this指针传递
            item.mount.call(null, that._context)
        }
    })
}
