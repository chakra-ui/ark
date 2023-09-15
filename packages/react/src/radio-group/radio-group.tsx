import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { RadioGroupProvider } from './radio-group-context'
import { useRadioGroup, type UseRadioGroupProps } from './use-radio-group'

export type RadioGroupProps = Assign<HTMLArkProps<'div'>, UseRadioGroupProps>

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const [useRadioGroupProps, divProps] = createSplitProps<UseRadioGroupProps>()(props, [
    'defaultValue',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'id',
    'ids',
    'name',
    'onValueChange',
    'orientation',
    'value',
  ])
  const radioGroup = useRadioGroup(useRadioGroupProps)
  const mergedProps = mergeProps(radioGroup.rootProps, divProps)

  return (
    <RadioGroupProvider value={radioGroup}>
      <ark.div {...mergedProps} ref={ref} />
    </RadioGroupProvider>
  )
})

RadioGroup.displayName = 'RadioGroup'
