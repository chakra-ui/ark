import { autoresizeTextarea } from '@zag-js/auto-resize'
import { mergeProps } from '@zag-js/react'
import { forwardRef, useEffect, useRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from './use-field-context'

export interface FieldTextareaBaseProps extends PolymorphicProps {
  /**
   * Whether the textarea should autoresize
   * @default false
   */
  autoresize?: boolean
}
export interface FieldTextareaProps extends HTMLProps<'textarea'>, FieldTextareaBaseProps {}

export const FieldTextarea = forwardRef<HTMLTextAreaElement, FieldTextareaProps>((props, ref) => {
  const { autoresize, ...textareaProps } = props
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'textarea'>>(
    field?.getTextareaProps(),
    { style: { resize: autoresize ? 'none' : undefined } },
    textareaProps,
  )

  useEffect(() => {
    if (!autoresize) return
    return autoresizeTextarea(textareaRef.current)
  }, [autoresize])

  return <ark.textarea {...mergedProps} ref={composeRefs(ref, textareaRef)} />
})

FieldTextarea.displayName = 'FieldTextarea'
