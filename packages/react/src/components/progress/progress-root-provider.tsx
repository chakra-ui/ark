'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseProgressReturn } from './use-progress.ts'
import { ProgressProvider } from './use-progress-context.ts'

interface RootProviderProps {
  value: UseProgressReturn
}

export interface ProgressRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface ProgressRootProviderProps extends HTMLProps<'div'>, ProgressRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const ProgressRootProvider = forwardRef<HTMLDivElement, ProgressRootProviderProps>((props, ref) => {
  const [{ value: progress }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(progress.getRootProps(), localProps)

  return (
    <ProgressProvider value={progress}>
      <ark.div {...mergedProps} ref={ref} />
    </ProgressProvider>
  )
})

ProgressRootProvider.displayName = 'ProgressRootProvider'
