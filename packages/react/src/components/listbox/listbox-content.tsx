import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'

export interface ListboxContentBaseProps extends PolymorphicProps {}
export interface ListboxContentProps extends HTMLProps<'div'>, ListboxContentBaseProps {}

export const ListboxContent = forwardRef<HTMLDivElement, ListboxContentProps>((props, ref) => {
  const listbox = useListboxContext()
  const mergedProps = mergeProps(listbox.getContentProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ListboxContent.displayName = 'ListboxContent'
