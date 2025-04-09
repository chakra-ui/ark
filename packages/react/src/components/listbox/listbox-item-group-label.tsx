import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'
import { useListboxItemGroupPropsContext } from './use-listbox-item-group-props'

export interface ListboxItemGroupLabelBaseProps extends PolymorphicProps {}
export interface ListboxItemGroupLabelProps extends HTMLProps<'div'>, ListboxItemGroupLabelBaseProps {}

export const ListboxItemGroupLabel = forwardRef<HTMLDivElement, ListboxItemGroupLabelProps>((props, ref) => {
  const listbox = useListboxContext()
  const itemGroupProps = useListboxItemGroupPropsContext()
  const mergedProps = mergeProps(listbox.getItemGroupLabelProps({ htmlFor: itemGroupProps.id }), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ListboxItemGroupLabel.displayName = 'ListboxItemGroupLabel'
