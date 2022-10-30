import * as editable from '@zag-js/editable'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { splitProps } from '../split-props'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseEditableProps = Omit<editable.Context, 'id'> & {
  defaultValue?: editable.Context['value']
}
export type UseEditableReturn = ReturnType<typeof useEditable>

export const useEditable = (props: UseEditableProps) => {
  const [{ value, defaultValue }, editableProps, htmlProps] = splitProps(
    props,
    ['value', 'defaultValue'],
    [
      'activationMode',
      'autoResize',
      'dir',
      'disabled',
      'getRootNode',
      'ids',
      'invalid',
      'maxLength',
      'name',
      'onCancel',
      'onChange',
      'onEdit',
      'onSubmit',
      'placeholder',
      'readonly',
      'selectOnFocus',
      'startWithEditView',
      'submitMode',
      'translations',
    ],
  )

  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...editableProps,
    value: value ?? defaultValue,
  })

  const context = filterUndefinedEntries({
    ...initialContext,
    value,
  })

  const [state, send] = useMachine(editable.machine(initialContext), { context })

  const api = editable.connect(state, send, normalizeProps)
  return { api, htmlProps }
}
