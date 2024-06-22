import { fieldAnatomy } from '@ark-ui/anatomy'
import { getWindow } from '@zag-js/dom-query'
import { type HTMLAttributes, computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

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
  const { required, disabled, invalid, readOnly } = props
  const state = reactive({
    hasErrorText: false,
    hasHelperText: false,
  })

  const id = props.id ?? `field-${Math.random().toString(36).substr(2, 9)}`
  const rootRef = ref(null)
  const errorTextId = `field::${id}::error-text`
  const helperTextId = `field::${id}::helper-text`
  const labelId = `field::${id}::label`

  onMounted(() => {
    const rootNode = rootRef.value
    if (!rootNode) return

    const win = getWindow(rootNode)
    const doc = win.document

    const checkTextElements = () => {
      state.hasErrorText = !!doc.getElementById(errorTextId)
      state.hasHelperText = !!doc.getElementById(helperTextId)
    }

    checkTextElements()
    const observer = new win.MutationObserver(checkTextElements)

    observer.observe(rootNode, { childList: true, subtree: true })

    onBeforeUnmount(() => {
      observer.disconnect()
    })
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

  if (state.hasErrorText && invalid) labelIds.push(errorTextId)
  if (state.hasHelperText) labelIds.push(helperTextId)

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

  const getErrorTextProps = (): HTMLAttributes => ({
    id: errorTextId,
    ...parts.errorText.attrs,
    'aria-live': 'polite',
  })

  return computed(() => ({
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
  }))
}

type Booleanish = boolean | 'true' | 'false'
const dataAttr = (condition: boolean | undefined) => (condition ? '' : undefined) as Booleanish
const ariaAttr = (condition: boolean | undefined) => (condition ? true : undefined)
