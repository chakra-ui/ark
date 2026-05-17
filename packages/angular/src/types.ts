export type ArkProps = Record<string, unknown>

export type ArkBooleanInput = boolean | '' | 'true' | 'false'

export interface ArkModelChannel<T> {
  readonly value: T
  readonly controlled: boolean
}

export interface ArkEmittedDetail<T> {
  readonly detail: T
}

export type ArkRenderContext = Record<string, unknown>

export type ArkProviderContext = Record<string, unknown>
