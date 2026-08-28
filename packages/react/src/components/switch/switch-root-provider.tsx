'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseSwitchReturn } from './use-switch.ts'
import { SwitchProvider } from './use-switch-context.ts'

interface RootProviderProps {
  value: UseSwitchReturn
}

export interface SwitchRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SwitchRootProviderProps extends HTMLProps<'label'>, SwitchRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const SwitchRootProvider = forwardRef<HTMLLabelElement, SwitchRootProviderProps>((props, ref) => {
  const [{ value: api }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(api.getRootProps(), localProps)

  return (
    <SwitchProvider value={api}>
      <ark.label {...mergedProps} ref={ref} />
    </SwitchProvider>
  )
})

SwitchRootProvider.displayName = 'SwitchRootProvider'
