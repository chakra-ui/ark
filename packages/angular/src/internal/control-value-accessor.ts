/** @internal CVA controller helpers for form-bearing Angular directives. Not part of the consumer API. */
import type { ModelSignal } from '@angular/core'
import { warnMixedFormAndModelBinding } from './forms-diagnostics'

export interface ArkCvaController<T> {
  writeValue(value: T | null): void
  registerOnChange(fn: (value: T | undefined) => void): void
  registerOnTouched(fn: () => void): void
  setDisabledState(disabled: boolean): void
  notifyValueChange(value: T | undefined): void
  markTouched(): void
}

export interface ArkCvaControllerOptions<T> {
  value: ModelSignal<T | undefined>
  setDisabled: (disabled: boolean) => void
  componentName: string
  hasExternalModelBinding: () => boolean
}

const noopChange = <T>(_value: T | undefined): void => {}
const noopTouched = (): void => {}

export const createArkCvaController = <T>(options: ArkCvaControllerOptions<T>): ArkCvaController<T> => {
  let onChange: (value: T | undefined) => void = noopChange
  let onTouched: () => void = noopTouched
  let warned = false

  const maybeWarn = () => {
    if (warned) return
    if (!options.hasExternalModelBinding()) return
    warned = true
    warnMixedFormAndModelBinding(options.componentName)
  }

  return {
    writeValue(value) {
      maybeWarn()
      options.value.set(value === null ? undefined : value)
    },
    registerOnChange(fn) {
      maybeWarn()
      onChange = fn
    },
    registerOnTouched(fn) {
      onTouched = fn
    },
    setDisabledState(disabled) {
      options.setDisabled(disabled)
    },
    notifyValueChange(value) {
      onChange(value)
    },
    markTouched() {
      onTouched()
    },
  }
}
