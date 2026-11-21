'use client'

import type { RootState } from '@zag-js/fieldset'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldsetContext } from './use-fieldset-context.ts'

export interface FieldsetErrorTextState extends RootState {}
export interface FieldsetErrorTextBaseProps extends PolymorphicProps<FieldsetErrorTextState> {}
export interface FieldsetErrorTextProps extends HTMLProps<'span'>, FieldsetErrorTextBaseProps {}

export const FieldsetErrorText = forwardRef<HTMLSpanElement, FieldsetErrorTextProps>((props, ref) => {
  const fieldset = useFieldsetContext()
  const mergedProps = mergeProps<HTMLProps<'span'>>(fieldset?.getErrorTextProps(), props)
  return <ark.span {...mergedProps} ref={ref} state={fieldset?.getRootState()} />
})

FieldsetErrorText.displayName = 'FieldsetErrorText'
