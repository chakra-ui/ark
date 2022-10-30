import * as editable from '@zag-js/editable'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'

export type UseEditableProps = Omit<editable.Context, 'id'>
export type UseEditableReturn = ReturnType<typeof useEditable>

export const useEditable = (props: UseEditableProps) => {
  const {
    activationMode,
    autoResize,
    dir,
    disabled,
    getRootNode,
    ids,
    invalid,
    maxLength,
    name,
    onCancel,
    onChange,
    onEdit,
    onSubmit,
    placeholder,
    readonly,
    selectOnFocus,
    startWithEditView,
    submitMode,
    translations,
    value,
    ...htmlProps
  } = props
  const [state, send] = useMachine(
    editable.machine({
      id: useId(),
      activationMode,
      autoResize,
      dir,
      disabled,
      getRootNode,
      ids,
      invalid,
      maxLength,
      name,
      onCancel,
      onChange,
      onEdit,
      onSubmit,
      placeholder,
      readonly,
      selectOnFocus,
      startWithEditView,
      submitMode,
      translations,
      value,
    }),
  )

  const api = editable.connect(state, send, normalizeProps)
  return { api, htmlProps }
}
