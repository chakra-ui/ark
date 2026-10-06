'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { useComboboxItemPropsContext } from './use-combobox-item-props-context.ts'

export interface ComboboxItemIndicatorBaseProps extends PolymorphicProps {}
export interface ComboboxItemIndicatorProps extends HTMLProps<'span'>, ComboboxItemIndicatorBaseProps {}

export const ComboboxItemIndicator = forwardRef<HTMLSpanElement, ComboboxItemIndicatorProps>((props, ref) => {
  const combobox = useComboboxContext()
  const itemProps = useComboboxItemPropsContext()
  const mergedProps = mergeProps(combobox.getItemIndicatorProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

ComboboxItemIndicator.displayName = 'ComboboxItemIndicator'
