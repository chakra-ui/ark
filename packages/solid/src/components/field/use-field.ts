import { fieldAnatomy } from '@ark-ui/anatomy'
import { getWindow } from '@zag-js/dom-query'
import { createEffect, createSignal, onCleanup } from 'solid-js'

const parts = fieldAnatomy.build()

export interface UseFieldProps {
  id?: string
  required?: boolean
  disabled?: boolean
  invalid?: boolean
  readOnly?: boolean
}

export type UseFieldReturn = ReturnType<typeof useField>

export const useField = (props: UseFieldProps) => {
  const { required = false, disabled = false, invalid = false, readOnly = false } = props
  const [hasErrorText, setHasErrorText] = createSignal(false)
  const [hasHelperText, setHasHelperText] = createSignal(false)

  const id = props.id ?? `field-${Math.random().toString(36).substr(2, 9)}`
  let rootRef: HTMLDivElement | undefined
  const errorTextId = `field::${id}::error-text`
  const helperTextId = `field::${id}::helper-text`
  const labelId = `field::${id}::label`

  createEffect(() => {
    const rootNode = rootRef
    if (!rootNode) return

    const win = getWindow(rootNode)
    const doc = win.document

    const checkTextElements = () => {
      setHasErrorText(!!doc.getElementById(errorTextId))
      setHasHelperText(!!doc.getElementById(helperTextId))
    }

    checkTextElements()
    const observer = new win.MutationObserver(checkTextElements)

    observer.observe(rootNode, { childList: true, subtree: true })

    onCleanup(() => observer.disconnect())
  })

  const getRootProps = () => ({
    ...parts.root.attrs,
    role: 'group',
    'data-disabled': dataAttr(disabled),
    'data-invalid': dataAttr(invalid),
    'data-readonly': dataAttr(readOnly),
  })

  const getLabelProps = () => ({
    ...parts.label.attrs,
    id: labelId,
    'data-disabled': dataAttr(disabled),
    'data-invalid': dataAttr(invalid),
    'data-readonly': dataAttr(readOnly),
    htmlFor: id,
  })

  const labelIds: string[] = []

  if (hasErrorText() && invalid) labelIds.push(errorTextId)
  if (hasHelperText()) labelIds.push(helperTextId)

  const getControlProps = () => ({
    'aria-describedby': labelIds.join(' ') || undefined,
    'aria-invalid': ariaAttr(invalid),
    'aria-required': ariaAttr(required),
    'aria-readonly': ariaAttr(readOnly),
    id,
    required,
    disabled,
    readOnly,
  })

  const getInputProps = () => ({
    ...getControlProps(),
    ...parts.input.attrs,
  })

  const getTextareaProps = () => ({
    ...getControlProps(),
    ...parts.textarea.attrs,
  })

  const getSelectProps = () => ({
    ...getControlProps(),
    ...parts.select.attrs,
  })

  const getHelperTextProps = () => ({
    id: helperTextId,
    ...parts.helperText.attrs,
  })

  const getErrorTextProps = () => ({
    id: errorTextId,
    ...parts.errorText.attrs,
    'aria-live': 'polite',
  })

  return {
    ariaDescribedby: labelIds.join(' '),
    ids: {
      control: id,
      label: labelId,
      errorText: errorTextId,
      helperText: helperTextId,
    },
    refs: {
      rootRef,
    },
    disabled,
    invalid,
    readOnly,
    required,
    getLabelProps,
    getRootProps,
    getInputProps,
    getTextareaProps,
    getSelectProps,
    getHelperTextProps,
    getErrorTextProps,
  }
}

type Booleanish = boolean | 'true' | 'false'
const dataAttr = (condition: boolean | undefined) => (condition ? '' : undefined) as Booleanish
const ariaAttr = (condition: boolean | undefined) => (condition ? true : undefined)
