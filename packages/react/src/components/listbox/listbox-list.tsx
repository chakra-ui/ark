'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useListboxContext } from './use-listbox-context.ts'
import type { ListState } from '@zag-js/listbox'

export interface ListboxListState extends ListState {}

export interface ListboxListBaseProps extends PolymorphicProps<ListboxListState> {}
export interface ListboxListProps extends HTMLProps<'div'>, ListboxListBaseProps {}

export const ListboxList = forwardRef<HTMLDivElement, ListboxListProps>((props, ref) => {
  const listbox = useListboxContext()
  const mergedProps = mergeProps(listbox.getListProps(), props)

  return <ark.div {...mergedProps} ref={ref} state={listbox.getListState()} />
})

ListboxList.displayName = 'ListboxList'
