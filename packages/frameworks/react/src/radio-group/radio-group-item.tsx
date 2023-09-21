import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRadioGroupContext } from './radio-group-context'
import {
  RadioGroupItemProvider,
  type ItemState,
  type RadioGroupItemContext,
} from './radio-group-item-context'

export interface RadioGroupItemProps
  extends Assign<
      HTMLArkProps<'label'>,
      { children?: React.ReactNode | ((props: ItemState) => React.ReactNode) }
    >,
    RadioGroupItemContext {}

export const RadioGroupItem = forwardRef<HTMLLabelElement, RadioGroupItemProps>((props, ref) => {
  const [itemProps, { children, ...localProps }] = createSplitProps<RadioGroupItemContext>()(
    props,
    ['value', 'disabled', 'invalid'],
  )
  const api = useRadioGroupContext()
  const mergedProps = mergeProps(api.getItemProps(itemProps), localProps)
  const itemState = api.getItemState(itemProps)
  const view = runIfFn(children, itemState)

  return (
    <RadioGroupItemProvider value={props}>
      <ark.label {...mergedProps} ref={ref}>
        {view}
      </ark.label>
      <input {...api.getItemHiddenInputProps(itemProps)} />
    </RadioGroupItemProvider>
  )
})

RadioGroupItem.displayName = 'RadioGroupItem'
