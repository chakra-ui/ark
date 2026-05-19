import { type Signal, computed, signal } from '@angular/core'
import { createArkId } from '@ark-ui/angular/src/internal'
import { fieldsetParts } from './fieldset.anatomy'
import type { FieldsetResolvedIds } from './fieldset.types'

export type ArkProps = Record<string, unknown>

export interface UseFieldsetProps {
  id?: string
  disabled?: boolean
  invalid?: boolean
}

export interface UseFieldsetReturn {
  ids: FieldsetResolvedIds
  disabled: Signal<boolean>
  invalid: Signal<boolean>
  hasErrorText: Signal<boolean>
  hasHelperText: Signal<boolean>
  ariaDescribedby: Signal<string | undefined>
  setHasErrorText(value: boolean): void
  setHasHelperText(value: boolean): void
  registerErrorText(): () => void
  registerHelperText(): () => void
  getRootProps(): ArkProps
  getLegendProps(): ArkProps
  getHelperTextProps(): ArkProps
  getErrorTextProps(): ArkProps
}

export interface UseFieldsetOptions {
  context: () => UseFieldsetProps
}

const dataAttr = (value: boolean | undefined): string | undefined => (value ? '' : undefined)

export function useFieldset(options: UseFieldsetOptions): UseFieldsetReturn {
  const fallbackId = createArkId('fieldset')

  const propsSignal = computed(() => options.context())

  const id = computed(() => propsSignal().id ?? fallbackId)
  const ids = computed<FieldsetResolvedIds>(() => {
    const baseId = id()
    return {
      root: `fieldset::${baseId}`,
      legend: `fieldset::${baseId}::legend`,
      errorText: `fieldset::${baseId}::error-text`,
      helperText: `fieldset::${baseId}::helper-text`,
    }
  })

  const disabled = computed(() => Boolean(propsSignal().disabled))
  const invalid = computed(() => Boolean(propsSignal().invalid))

  const errorTextCount = signal(0)
  const helperTextCount = signal(0)
  const hasErrorTextSignal = computed(() => errorTextCount() > 0)
  const hasHelperTextSignal = computed(() => helperTextCount() > 0)

  const ariaDescribedby = computed<string | undefined>(() => {
    const list: string[] = []
    if (hasErrorTextSignal() && invalid()) list.push(ids().errorText)
    if (hasHelperTextSignal()) list.push(ids().helperText)
    return list.length > 0 ? list.join(' ') : undefined
  })

  const getRootProps = (): ArkProps => ({
    ...fieldsetParts.root.attrs,
    id: ids().root,
    disabled: disabled() || undefined,
    'data-disabled': dataAttr(disabled()),
    'data-invalid': dataAttr(invalid()),
    'aria-labelledby': ids().legend,
    'aria-describedby': ariaDescribedby(),
  })

  const getLegendProps = (): ArkProps => ({
    ...fieldsetParts.legend.attrs,
    id: ids().legend,
    'data-disabled': dataAttr(disabled()),
    'data-invalid': dataAttr(invalid()),
  })

  const getHelperTextProps = (): ArkProps => ({
    ...fieldsetParts.helperText.attrs,
    id: ids().helperText,
    'data-disabled': dataAttr(disabled()),
    'data-invalid': dataAttr(invalid()),
  })

  const getErrorTextProps = (): ArkProps => ({
    ...fieldsetParts.errorText.attrs,
    id: ids().errorText,
    'aria-live': invalid() ? 'polite' : undefined,
    'data-disabled': dataAttr(disabled()),
    'data-invalid': dataAttr(invalid()),
  })

  return {
    get ids(): FieldsetResolvedIds {
      return ids()
    },
    disabled,
    invalid,
    hasErrorText: hasErrorTextSignal,
    hasHelperText: hasHelperTextSignal,
    ariaDescribedby,
    setHasErrorText: (value: boolean) => errorTextCount.set(value ? 1 : 0),
    setHasHelperText: (value: boolean) => helperTextCount.set(value ? 1 : 0),
    registerErrorText: () => {
      errorTextCount.update((count) => count + 1)
      return () => errorTextCount.update((count) => Math.max(0, count - 1))
    },
    registerHelperText: () => {
      helperTextCount.update((count) => count + 1)
      return () => helperTextCount.update((count) => Math.max(0, count - 1))
    },
    getRootProps,
    getLegendProps,
    getHelperTextProps,
    getErrorTextProps,
  }
}
