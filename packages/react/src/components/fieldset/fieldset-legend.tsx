'use client'

import type { RootState } from '@zag-js/fieldset'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldsetContext } from './use-fieldset-context.ts'

export interface FieldsetLegendState extends RootState {}
export interface FieldsetLegendBaseProps extends PolymorphicProps<FieldsetLegendState> {}
export interface FieldsetLegendProps extends HTMLProps<'legend'>, FieldsetLegendBaseProps {}

export const FieldsetLegend = forwardRef<HTMLLegendElement, FieldsetLegendProps>((props, ref) => {
  const fieldset = useFieldsetContext()
  const mergedProps = mergeProps<HTMLProps<'legend'>>(fieldset?.getLegendProps(), props)
  return <ark.legend {...mergedProps} ref={ref} state={fieldset?.getRootState()} />
})

FieldsetLegend.displayName = 'FieldsetLegend'
