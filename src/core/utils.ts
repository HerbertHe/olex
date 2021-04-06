export const makeNewOLEXError = (err: string) => {
    return new Error(`OLEX Error: ${err}`)
}
