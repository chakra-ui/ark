'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseRadioGroupProps, useRadioGroup } from './use-radio-group.ts'
import { RadioGroupProvider } from './use-radio-group-context.ts'
import type { RootState } from '@zag-js/radio-group'

export interface RadioGroupRootState extends RootState {}

export interface RadioGroupRootBaseProps extends UseRadioGroupProps, PolymorphicProps<RadioGroupRootState> {}
export interface RadioGroupRootProps extends Assign<HTMLProps<'div'>, RadioGroupRootBaseProps> {}

const splitRootProps = createSplitProps<UseRadioGroupProps>()

export const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupRootProps>((props, ref) => {
  const [useRadioGroupProps, localProps] = splitRootProps(props, [
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'name',
    'onValueChange',
    'orientation',
    'readOnly',
    'required',
    'value',
  ])
  const radioGroup = useRadioGroup(useRadioGroupProps)
  const mergedProps = mergeProps(radioGroup.getRootProps(), localProps)

  return (
    <RadioGroupProvider value={radioGroup}>
      <ark.div {...mergedProps} ref={ref} state={radioGroup.getRootState()} />
    </RadioGroupProvider>
  )
})

RadioGroupRoot.displayName = 'RadioGroupRoot'
