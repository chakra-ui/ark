'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseToggleGroupReturn } from './use-toggle-group.ts'
import { ToggleGroupProvider } from './use-toggle-group-context.ts'
import type { RootState } from '@zag-js/toggle-group'

interface RootProviderProps {
  value: UseToggleGroupReturn
}

export interface ToggleGroupRootProviderState extends RootState {}

export interface ToggleGroupRootProviderBaseProps
  extends RootProviderProps, PolymorphicProps<ToggleGroupRootProviderState> {}
export interface ToggleGroupRootProviderProps extends HTMLProps<'div'>, ToggleGroupRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const ToggleGroupRootProvider = forwardRef<HTMLDivElement, ToggleGroupRootProviderProps>((props, ref) => {
  const [{ value: toggleGroup }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(toggleGroup.getRootProps(), localProps)

  return (
    <ToggleGroupProvider value={toggleGroup}>
      <ark.div {...mergedProps} ref={ref} state={toggleGroup.getRootState()} />
    </ToggleGroupProvider>
  )
})

ToggleGroupRootProvider.displayName = 'ToggleGroupRootProvider'
