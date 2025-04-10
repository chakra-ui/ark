import { autoresizeTextarea } from '@zag-js/auto-resize'
import { mergeProps } from '@zag-js/solid'
import { onCleanup, onMount, splitProps } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from './use-field-context'

export interface FieldTextareaBaseProps extends PolymorphicProps<'textarea'> {
  /**
   * Whether the textarea should autoresize
   * @default false
   */
  autoresize?: boolean
}
export interface FieldTextareaProps extends HTMLProps<'textarea'>, FieldTextareaBaseProps {}

export const FieldTextarea = (props: FieldTextareaProps) => {
  const field = useFieldContext()
  let textareaRef: HTMLTextAreaElement
  const [autoresizeProps, textareaProps] = splitProps(props, ['autoresize'])

  const mergedProps = mergeProps(
    () => field?.().getTextareaProps(),
    () => ({ style: { resize: autoresizeProps.autoresize ? 'none' : undefined } }),
    textareaProps,
  )

  onMount(() => {
    if (!autoresizeProps.autoresize) return
    const cleanup = autoresizeTextarea(textareaRef)
    onCleanup(() => cleanup?.())
  })

  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  return <ark.textarea {...mergedProps} ref={composeRefs((el) => (textareaRef = el), props.ref)} />
}
