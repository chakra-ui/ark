'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useListboxContext } from './use-listbox-context.ts'
import type { ContentState } from '@zag-js/listbox'

export interface ListboxContentState extends ContentState {}

export interface ListboxContentBaseProps extends PolymorphicProps<ListboxContentState> {}
export interface ListboxContentProps extends HTMLProps<'div'>, ListboxContentBaseProps {}

export const ListboxContent = forwardRef<HTMLDivElement, ListboxContentProps>((props, ref) => {
  const listbox = useListboxContext()
  const mergedProps = mergeProps(listbox.getContentProps(), props)

  return <ark.div {...mergedProps} ref={ref} state={listbox.getContentState()} />
})

ListboxContent.displayName = 'ListboxContent'
