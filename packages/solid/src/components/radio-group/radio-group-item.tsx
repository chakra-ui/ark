import type { ItemProps } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useRadioGroupContext } from './use-radio-group-context.ts'
import { RadioGroupItemProvider } from './use-radio-group-item-context.ts'
import { RadioGroupItemPropsProvider } from './use-radio-group-item-props-context.ts'

export interface RadioGroupItemBaseProps extends ItemProps, PolymorphicProps<'label'> {}
export interface RadioGroupItemProps extends HTMLProps<'label'>, RadioGroupItemBaseProps {}

export const RadioGroupItem = (props: RadioGroupItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled', 'invalid'])
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
