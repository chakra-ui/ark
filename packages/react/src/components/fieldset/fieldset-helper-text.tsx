'use client'

import type { RootState } from '@zag-js/fieldset'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldsetContext } from './use-fieldset-context.ts'

export interface FieldsetHelperTextState extends RootState {}
export interface FieldsetHelperTextBaseProps extends PolymorphicProps<FieldsetHelperTextState> {}
export interface FieldsetHelperTextProps extends HTMLProps<'span'>, FieldsetHelperTextBaseProps {}

export const FieldsetHelperText = forwardRef<HTMLSpanElement, FieldsetHelperTextProps>((props, ref) => {
  const fieldset = useFieldsetContext()
  const mergedProps = mergeProps<HTMLProps<'span'>>(fieldset?.getHelperTextProps(), props)
  return <ark.span {...mergedProps} ref={ref} state={fieldset?.getRootState()} />
})

FieldsetHelperText.displayName = 'FieldsetHelperText'
