import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'

export interface ListboxLabelBaseProps extends PolymorphicProps {}
export interface ListboxLabelProps extends HTMLProps<'label'>, ListboxLabelBaseProps {}

export const ListboxLabel = forwardRef<HTMLLabelElement, ListboxLabelProps>((props, ref) => {
  const listbox = useListboxContext()
  const mergedProps = mergeProps(listbox.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

ListboxLabel.displayName = 'ListboxLabel'
