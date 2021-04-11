// 在此定义节点的类型

export interface IOLEXNode {
    command: string
    options: Array<string | IOLEXNode> | null
    group: string | null
    value?: string
}

export interface IOLEXNodeTree extends IOLEXNode {
    children?: Array<IOLEXNodeTree>
}
