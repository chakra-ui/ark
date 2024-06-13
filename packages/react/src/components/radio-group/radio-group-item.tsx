import type { ItemProps } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { RadioGroupItemProvider } from './use-radio-group-item-context'
import { RadioGroupItemPropsProvider } from './use-radio-group-item-props-context'

export interface RadioGroupItemBaseProps extends ItemProps {}
export interface RadioGroupItemProps
  extends Assign<HTMLArkProps<'label'>, RadioGroupItemBaseProps> {}

export const RadioGroupItem = forwardRef<HTMLLabelElement, RadioGroupItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
    'value',
    'disabled',
    'invalid',
  ])
  const radioGroup = useRadioGroupContext()
  const mergedProps = mergeProps(radioGroup.getItemProps(itemProps), localProps)
  const itemState = radioGroup.getItemState(itemProps)

  return (
    <RadioGroupItemProvider value={itemState}>
      <RadioGroupItemPropsProvider value={itemProps}>
        <ark.label {...mergedProps} ref={ref} />
      </RadioGroupItemPropsProvider>
    </RadioGroupItemProvider>
  )
})

RadioGroupItem.displayName = 'RadioGroupItem'
