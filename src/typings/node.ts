// 在此定义节点的类型

/**
 * 参考
 * https://www.jianshu.com/p/9f3cea03d627
 */
export type NodeType =
    | "ESCAPE"
    | "GROUP_START"
    | "GROUP_END"
    | "MATH_ENV"
    | "TABLE_ALIGN"
    | "RETURN"
    | "CHAR"
    | "PARAM"
    | "SPACE"
    | "COMMENT"

export interface INode {
    type: string
    token: string
}

export interface INodeTree extends INode {
    children?: Array<INodeTree>
}
