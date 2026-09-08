'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseRadioGroupReturn } from './use-radio-group.ts'
import { RadioGroupProvider } from './use-radio-group-context.ts'
import type { RootState } from '@zag-js/radio-group'

interface RootProviderProps {
  value: UseRadioGroupReturn
}

export interface RadioGroupRootProviderState extends RootState {}

export interface RadioGroupRootProviderBaseProps
  extends RootProviderProps, PolymorphicProps<RadioGroupRootProviderState> {}
export interface RadioGroupRootProviderProps extends HTMLProps<'div'>, RadioGroupRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const RadioGroupRootProvider = forwardRef<HTMLDivElement, RadioGroupRootProviderProps>((props, ref) => {
  const [{ value: radioGroup }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(radioGroup.getRootProps(), localProps)

  return (
    <RadioGroupProvider value={radioGroup}>
      <ark.div {...mergedProps} ref={ref} state={radioGroup.getRootState()} />
    </RadioGroupProvider>
  )
})

RadioGroupRootProvider.displayName = 'RadioGroupRootProvider'
