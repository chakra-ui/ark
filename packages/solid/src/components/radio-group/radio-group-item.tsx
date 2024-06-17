import type { ItemProps } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/solid'
import { type JSX, createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { RadioGroupItemProvider } from './use-radio-group-item-context'
import { RadioGroupItemPropsProvider } from './use-radio-group-item-props-context'

export interface RadioGroupItemBaseProps extends ItemProps, PolymorphicProps<'label'> {}
export interface RadioGroupItemProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    RadioGroupItemBaseProps {}

export const RadioGroupItem = (props: RadioGroupItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
    'value',
    'disabled',
    'invalid',
  ])
  const radioGroup = useRadioGroupContext()
  const mergedProps = mergeProps(() => radioGroup().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => radioGroup().getItemState(itemProps))

  return (
    <RadioGroupItemPropsProvider value={itemProps}>
      <RadioGroupItemProvider value={itemState}>
        <ark.label {...mergedProps} />
      </RadioGroupItemProvider>
    </RadioGroupItemPropsProvider>
  )
}
