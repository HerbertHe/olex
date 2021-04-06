import { CommandParsersType, IPackage } from "./packages"

export type SupportedCommandsType = Set<string>

export type PackagesType = Map<string, IPackage>

export type ParsersType = Map<string, CommandParsersType>
