import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'
import { useListboxItemPropsContext } from './use-listbox-item-props-context'

export interface ListboxItemIndicatorBaseProps extends PolymorphicProps {}
export interface ListboxItemIndicatorProps extends HTMLProps<'div'>, ListboxItemIndicatorBaseProps {}

export const ListboxItemIndicator = forwardRef<HTMLDivElement, ListboxItemIndicatorProps>((props, ref) => {
  const listbox = useListboxContext()
  const itemProps = useListboxItemPropsContext()
  const mergedProps = mergeProps(listbox.getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ListboxItemIndicator.displayName = 'ListboxItemIndicator'
