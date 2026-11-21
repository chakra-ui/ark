'use client'

import type { IndicatorProps, IndicatorState } from '@zag-js/field'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'

export interface FieldIndicatorState extends IndicatorState {}
export interface FieldIndicatorBaseProps extends IndicatorProps, PolymorphicProps<FieldIndicatorState> {}
export interface FieldIndicatorProps extends HTMLProps<'span'>, FieldIndicatorBaseProps {}

const splitIndicatorProps = createSplitProps<IndicatorProps>()

export const FieldIndicator = forwardRef<HTMLSpanElement, FieldIndicatorProps>((props, ref) => {
  const [indicatorProps, localProps] = splitIndicatorProps(props, ['type'])
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'span'>>(field?.getIndicatorProps(indicatorProps), localProps)
  return <ark.span {...mergedProps} ref={ref} state={field?.getIndicatorState(indicatorProps)} />
})

FieldIndicator.displayName = 'FieldIndicator'
