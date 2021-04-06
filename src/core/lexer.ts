const lexerRegex = /\\([a-z]+)\s*(\[([a-zA-Z0-9]+)\ ])?\s*(\{([a-zA-Z0-9\|\&\\ ]+)\})?\s*(\{([a-zA-Z0-9\|\&\\ ]+)\})?\s*[\r\n]?/g

const beginBlock = /\\begin\{([a-zA-Z0-9]+)\}([\s\S]+)\\end\{([a-zA-Z0-9]+)\}/

const inlineMath = /\$([^\r\n]+)\$/

const mathBlock = /\[([\s\S]+)\]/

const newline = /\\\\/
