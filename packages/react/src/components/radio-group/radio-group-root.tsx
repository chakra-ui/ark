import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseRadioGroupProps, useRadioGroup } from './use-radio-group'
import { RadioGroupProvider } from './use-radio-group-context'

export interface RadioGroupRootBaseProps extends UseRadioGroupProps, PolymorphicProps {}
export interface RadioGroupRootProps extends Assign<HTMLProps<'div'>, RadioGroupRootBaseProps> {}

export const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupRootProps>((props, ref) => {
  const [useRadioGroupProps, localProps] = createSplitProps<UseRadioGroupProps>()(props, [
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'name',
    'onValueChange',
    'orientation',
    'readOnly',
    'value',
  ])
  const radioGroup = useRadioGroup(useRadioGroupProps)
  const mergedProps = mergeProps(radioGroup.getRootProps(), localProps)

  return (
    <RadioGroupProvider value={radioGroup}>
      <ark.div {...mergedProps} ref={ref} />
    </RadioGroupProvider>
  )
})

RadioGroupRoot.displayName = 'RadioGroupRoot'
