'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { useComboboxItemGroupPropsContext } from './use-combobox-item-group-props-context.ts'

export interface ComboboxItemGroupLabelBaseProps extends PolymorphicProps {}
export interface ComboboxItemGroupLabelProps extends HTMLProps<'div'>, ComboboxItemGroupLabelBaseProps {}

export const ComboboxItemGroupLabel = forwardRef<HTMLDivElement, ComboboxItemGroupLabelProps>((props, ref) => {
  const combobox = useComboboxContext()
  const itemGroupProps = useComboboxItemGroupPropsContext()
  const mergedProps = mergeProps(combobox.getItemGroupLabelProps({ htmlFor: itemGroupProps.id }), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ComboboxItemGroupLabel.displayName = 'ComboboxItemGroupLabel'
