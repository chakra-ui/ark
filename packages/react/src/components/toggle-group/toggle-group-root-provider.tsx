'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseToggleGroupReturn } from './use-toggle-group.ts'
import { ToggleGroupProvider } from './use-toggle-group-context.ts'

interface RootProviderProps {
  value: UseToggleGroupReturn
}

export interface ToggleGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface ToggleGroupRootProviderProps extends HTMLProps<'div'>, ToggleGroupRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const ToggleGroupRootProvider = forwardRef<HTMLDivElement, ToggleGroupRootProviderProps>((props, ref) => {
  const [{ value: toggleGroup }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(toggleGroup.getRootProps(), localProps)

  return (
    <ToggleGroupProvider value={toggleGroup}>
      <ark.div {...mergedProps} ref={ref} />
    </ToggleGroupProvider>
  )
})

ToggleGroupRootProvider.displayName = 'ToggleGroupRootProvider'
