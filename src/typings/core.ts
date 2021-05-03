import { CommandParsersType, IPackage } from "./packages"

export type SupportedCommandsType = Set<string>

export type PackagesType = Map<string, IPackage>

export type ParsersType = Map<string, CommandParsersType>

export interface IOLEXContext {
    setContextVariable: (scope: string, name: string, value: any) => void
    getContextVariable: (scope: string, name: string) => void
}
