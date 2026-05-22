'use client'

import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseSwitchReturn } from './use-switch'
import { SwitchProvider } from './use-switch-context'

interface RootProviderProps {
  value: UseSwitchReturn
}

export interface SwitchRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SwitchRootProviderProps extends HTMLProps<'label'>, SwitchRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const SwitchRootProvider = ({ ref, ...props }: SwitchRootProviderProps) => {
  const [{ value: api }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(api.getRootProps(), localProps)

  return (
    <SwitchProvider value={api}>
      <ark.label {...mergedProps} ref={ref} />
    </SwitchProvider>
  )
}

SwitchRootProvider.displayName = 'SwitchRootProvider'
