'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useListVirtualizerContext } from './use-list-virtualizer-context.ts'

export interface ListVirtualizerContentBaseProps extends PolymorphicProps {}
export interface ListVirtualizerContentProps extends HTMLProps<'div'>, ListVirtualizerContentBaseProps {}

export const ListVirtualizerContent = forwardRef<HTMLDivElement, ListVirtualizerContentProps>((props, ref) => {
  const virtualizer = useListVirtualizerContext()
  const mergedProps = mergeProps({ style: virtualizer.getContentStyle() }, props)

  return <ark.div {...mergedProps} ref={ref} />
})

ListVirtualizerContent.displayName = 'ListVirtualizerContent'
