import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useRadioGroupContext } from './radio-group-context'
import { RadioProvider, type RadioGroupItemContext } from './radio-group-item-context'

export type RadioGroupItemProps = Assign<HTMLArkProps<'label'>, RadioGroupItemContext>

export const RadioGroupItem = (props: RadioGroupItemProps) => {
  const [itemProps, restProps] = createSplitProps<RadioGroupItemContext>()(props, [
    'value',
    'disabled',
    'invalid',
  ])
  const api = useRadioGroupContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), restProps)

  return (
    <RadioProvider value={itemProps}>
      <ark.label {...mergedProps} />
      <input {...api().getItemHiddenInputProps(itemProps)} />
    </RadioProvider>
  )
}
