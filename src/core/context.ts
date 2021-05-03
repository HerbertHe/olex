import { IOLEXContext } from "../typings/core"

export class OLEXContext implements IOLEXContext {
    private _ctx: Map<string, any> = new Map<string, any>()
    /**
     * 自定义上下文参量
     * @param scope 宏包作用域
     * @param name 参数名
     * @param value 参数值
     */
    setContextVariable = (scope: string, name: string, value: any) => {
        this._ctx.set(`${scope}-${name}`, value)
    }
    /**
     * 获取自定义的上下文参量
     * @param scope 宏包作用域
     * @param name 参数名
     */
    getContextVariable = (scope: string, name: string) => {
        return this._ctx.get(`${scope}-${name}`)
    }
}
