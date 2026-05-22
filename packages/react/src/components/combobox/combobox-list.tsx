'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxListBaseProps extends PolymorphicProps {}
export interface ComboboxListProps extends HTMLProps<'div'>, ComboboxListBaseProps {}

export const ComboboxList = ({ ref, ...props }: ComboboxListProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(combobox.getListProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

ComboboxList.displayName = 'ComboboxList'
