import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { RadioGroupProvider } from './radio-group-context'
import { useRadioGroup, UseRadioGroupProps } from './use-radio-group'

export type RadioGroupProps = Assign<HTMLArkProps<'div'>, UseRadioGroupProps>

export const RadioGroup = forwardRef<'div', UseRadioGroupProps>((props, ref) => {
  const [useRadioGroupProps, divProps] = createSplitProps<UseRadioGroupProps>()(props, [
    'defaultValue',
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'name',
    'onChange',
    'orientation',
    'readonly',
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
