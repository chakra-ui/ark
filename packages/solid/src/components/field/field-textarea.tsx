import { autoresizeTextarea } from '@zag-js/auto-resize'
import { mergeProps } from '@zag-js/solid'
import { createEffect } from 'solid-js'
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
  const { autoresize, ...textareaProps } = props

  const mergedProps = mergeProps(
    () => field?.().getTextareaProps(),
    () => ({ style: { resize: autoresize ? 'none' : undefined } }),
    textareaProps,
  )

  createEffect(() => {
    if (!autoresize) return
    const cleanup = autoresizeTextarea(textareaRef)
    return cleanup
  })

  return (
    <ark.textarea
      {...mergedProps}
      ref={(el) => {
        textareaRef = el
      }}
    />
  )
}
