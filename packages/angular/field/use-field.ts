import { type Signal, computed, inject, signal } from '@angular/core'
import { createArkId } from '@ark-ui/angular/src/internal'
import { ARK_FIELDSET_CONTEXT } from '@ark-ui/angular/fieldset'
import { fieldParts } from './field.anatomy'
import type { FieldElementIds, FieldResolvedIds } from './field.types'

export type ArkProps = Record<string, unknown>

export interface UseFieldProps {
  id?: string
  ids?: FieldElementIds
  required?: boolean
  disabled?: boolean
  invalid?: boolean
  readOnly?: boolean
  target?: string
}

export interface UseFieldReturn {
  ids: FieldResolvedIds
  disabled: Signal<boolean>
  invalid: Signal<boolean>
  readOnly: Signal<boolean>
  required: Signal<boolean>
  hasErrorText: Signal<boolean>
  hasHelperText: Signal<boolean>
  ariaDescribedby: Signal<string | undefined>
  setHasErrorText(value: boolean): void
  setHasHelperText(value: boolean): void
  getRootProps(): ArkProps
  getControlProps(): ArkProps
  getLabelProps(): ArkProps
  getInputProps(): ArkProps
  getTextareaProps(): ArkProps
  getSelectProps(): ArkProps
  getHelperTextProps(): ArkProps
  getErrorTextProps(): ArkProps
  getRequiredIndicatorProps(): ArkProps
  getItemControlId(value: string): string
  getItemLabelId(value: string): string
}

export interface UseFieldOptions {
  context: () => UseFieldProps
}

const dataAttr = (value: boolean | undefined): string | undefined => (value ? '' : undefined)
const ariaAttr = (value: boolean | undefined): 'true' | undefined => (value ? 'true' : undefined)

export function useField(options: UseFieldOptions): UseFieldReturn {
  const fallbackId = createArkId('field')
  const fieldsetContext = inject(ARK_FIELDSET_CONTEXT, { optional: true })

  const propsSignal = computed(() => options.context())

  const id = computed(() => propsSignal().id ?? fallbackId)
  const ids = computed<FieldResolvedIds>(() => {
    const provided = propsSignal().ids
    const baseId = id()
    return {
      root: provided?.root ?? `field::${baseId}`,
      control: provided?.control ?? baseId,
      label: provided?.label ?? `field::${baseId}::label`,
      errorText: provided?.errorText ?? `field::${baseId}::error-text`,
      helperText: provided?.helperText ?? `field::${baseId}::helper-text`,
    }
  })

  const disabled = computed(() => {
    if (propsSignal().disabled) return true
    return fieldsetContext ? fieldsetContext.disabled() : false
  })
  const invalid = computed(() => {
    if (propsSignal().invalid) return true
    return fieldsetContext ? fieldsetContext.invalid() : false
  })
  const readOnly = computed(() => Boolean(propsSignal().readOnly))
  const required = computed(() => Boolean(propsSignal().required))

  const hasErrorTextSignal = signal(false)
  const hasHelperTextSignal = signal(false)

  const ariaDescribedby = computed<string | undefined>(() => {
    const list: string[] = []
    if (hasErrorTextSignal() && invalid()) list.push(ids().errorText)
    if (hasHelperTextSignal()) list.push(ids().helperText)
    return list.length > 0 ? list.join(' ') : undefined
  })

  const targetControlId = computed<string | undefined>(() => {
    const t = propsSignal().target
    return t ? `field::${id()}::item::${t}` : undefined
  })

  const getRootProps = (): ArkProps => ({
    ...fieldParts.root.attrs,
    id: ids().root,
    role: 'group',
    'data-disabled': dataAttr(disabled()),
    'data-invalid': dataAttr(invalid()),
    'data-readonly': dataAttr(readOnly()),
  })

  const getLabelProps = (): ArkProps => ({
    ...fieldParts.label.attrs,
    id: ids().label,
    'data-disabled': dataAttr(disabled()),
    'data-invalid': dataAttr(invalid()),
    'data-readonly': dataAttr(readOnly()),
    'data-required': dataAttr(required()),
    htmlFor: targetControlId() ?? ids().control,
  })

  const getControlProps = (): ArkProps => ({
    'aria-describedby': ariaDescribedby(),
    'aria-invalid': ariaAttr(invalid()),
    'data-invalid': dataAttr(invalid()),
    'data-required': dataAttr(required()),
    'data-readonly': dataAttr(readOnly()),
    id: ids().control,
    required: required() || undefined,
    disabled: disabled() || undefined,
    readOnly: readOnly() || undefined,
  })

  const getInputProps = (): ArkProps => ({
    ...getControlProps(),
    ...fieldParts.input.attrs,
  })

  const getTextareaProps = (): ArkProps => ({
    ...getControlProps(),
    ...fieldParts.textarea.attrs,
  })

  const getSelectProps = (): ArkProps => ({
    ...getControlProps(),
    ...fieldParts.select.attrs,
  })

  const getHelperTextProps = (): ArkProps => ({
    ...fieldParts.helperText.attrs,
    id: ids().helperText,
    'data-disabled': dataAttr(disabled()),
  })

  const getErrorTextProps = (): ArkProps => ({
    ...fieldParts.errorText.attrs,
    id: ids().errorText,
    'aria-live': 'polite',
  })

  const getRequiredIndicatorProps = (): ArkProps => ({
    ...fieldParts.requiredIndicator.attrs,
    'aria-hidden': 'true',
  })

  return {
    get ids(): FieldResolvedIds {
      return ids()
    },
    disabled,
    invalid,
    readOnly,
    required,
    hasErrorText: hasErrorTextSignal.asReadonly(),
    hasHelperText: hasHelperTextSignal.asReadonly(),
    ariaDescribedby,
    setHasErrorText: (value: boolean) => hasErrorTextSignal.set(value),
    setHasHelperText: (value: boolean) => hasHelperTextSignal.set(value),
    getRootProps,
    getControlProps,
    getLabelProps,
    getInputProps,
    getTextareaProps,
    getSelectProps,
    getHelperTextProps,
    getErrorTextProps,
    getRequiredIndicatorProps,
    getItemControlId: (value: string) => `field::${id()}::item::${value}`,
    getItemLabelId: (value: string) => `field::${id()}::item::${value}::label`,
  }
}
