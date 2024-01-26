import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableCancelTriggerProps extends HTMLArkProps<'button'> {}

export const EditableCancelTrigger: ArkComponent<'button'> = (
  props: EditableCancelTriggerProps,
) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().cancelTriggerProps, props)

  return <ark.button {...mergedProps} />
}
