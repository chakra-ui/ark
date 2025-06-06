import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'
import { useListboxItemPropsContext } from './use-listbox-item-props-context'

export interface ListboxItemTextBaseProps extends PolymorphicProps {}
export interface ListboxItemTextProps extends HTMLProps<'div'>, ListboxItemTextBaseProps {}

export const ListboxItemText = forwardRef<HTMLDivElement, ListboxItemTextProps>((props, ref) => {
  const listbox = useListboxContext()
  const itemProps = useListboxItemPropsContext()
  const mergedProps = mergeProps(listbox.getItemTextProps(itemProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ListboxItemText.displayName = 'ListboxItemText'
