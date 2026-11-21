'use client'

import { autoresizeTextarea } from '@zag-js/auto-resize'
import type { RootState } from '@zag-js/field'
import { mergeProps } from '@zag-js/react'
import { forwardRef, useEffect, useRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'

export interface FieldTextareaState extends RootState {}
export interface FieldTextareaBaseProps extends PolymorphicProps<FieldTextareaState> {
  /**
   * Whether the textarea should autoresize
   * @default false
   */
  autoresize?: boolean | undefined
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

  const composedRefs = useComposedRefs(ref, textareaRef)

  useEffect(() => {
    if (!autoresize) return
    return autoresizeTextarea(textareaRef.current)
  }, [autoresize])

  return <ark.textarea {...mergedProps} ref={composedRefs} state={field?.getRootState()} />
})

FieldTextarea.displayName = 'FieldTextarea'
