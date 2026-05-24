'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseSplitterReturn } from './use-splitter.ts'
import { SplitterProvider } from './use-splitter-context.ts'

interface RootProviderProps {
  value: UseSplitterReturn
}

export interface SplitterRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SplitterRootProviderProps extends HTMLProps<'div'>, SplitterRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const SplitterRootProvider = forwardRef<HTMLDivElement, SplitterRootProviderProps>((props, ref) => {
  const [{ value: splitter }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(splitter.getRootProps(), localProps)

  return (
    <SplitterProvider value={splitter}>
      <ark.div {...mergedProps} ref={ref} />
    </SplitterProvider>
  )
})

SplitterRootProvider.displayName = 'SplitterRootProvider'
