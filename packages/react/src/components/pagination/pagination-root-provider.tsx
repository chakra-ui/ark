'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UsePaginationReturn } from './use-pagination.ts'
import { PaginationProvider } from './use-pagination-context.ts'

interface RootProviderProps {
  value: UsePaginationReturn
}

export interface PaginationRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface PaginationRootProviderProps extends HTMLProps<'nav'>, PaginationRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const PaginationRootProvider = forwardRef<HTMLElement, PaginationRootProviderProps>((props, ref) => {
  const [{ value: pagination }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(pagination.getRootProps(), localProps)

  return (
    <PaginationProvider value={pagination}>
      <ark.nav {...mergedProps} ref={ref} />
    </PaginationProvider>
  )
})

PaginationRootProvider.displayName = 'PaginationRootProvider'
