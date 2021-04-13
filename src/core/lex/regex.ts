// 需要重写关于group的匹配

const lexerRegex = /\\([a-z]+)\s*(\[([a-zA-Z0-9]+)\ ])?\s*(\{([a-zA-Z0-9\|\&\\ ]+)\})?\s*(\{([a-zA-Z0-9\|\&\\ ]+)\})?\s*[\r\n]?/g

export const beginBlockRegex = /\\begin\{([a-zA-Z0-9]+)\}/

const endBlockRegex = /\\end\{([a-zA-Z0-9]+)\}/

const inlineMathRegex = /\$([^\r\n]+)\$/

const mathBlockRegex = /\[([\s\S]+)\]/

const newlineRegex = /\\\\/

export const usepackageRegex = /\\usepackage\s*(\[([a-zA-Z0-9 ]+)\])?\s*\{([a-zA-Z0-9\-]+)\}/g
