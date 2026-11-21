'use client'

import type { ErrorTextProps, ErrorTextState } from '@zag-js/field'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'

export interface FieldErrorTextState extends ErrorTextState {}
export interface FieldErrorTextBaseProps extends ErrorTextProps, PolymorphicProps<FieldErrorTextState> {}
export interface FieldErrorTextProps extends Omit<HTMLProps<'span'>, 'id'>, FieldErrorTextBaseProps {}

const splitErrorTextProps = createSplitProps<ErrorTextProps>()

export const FieldErrorText = forwardRef<HTMLSpanElement, FieldErrorTextProps>((props, ref) => {
  const [errorTextProps, localProps] = splitErrorTextProps(props, ['match', 'id'])
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'span'>>(field?.getErrorTextProps(errorTextProps), localProps)
  return <ark.span {...mergedProps} ref={ref} state={field?.getErrorTextState(errorTextProps)} />
})

FieldErrorText.displayName = 'FieldErrorText'
