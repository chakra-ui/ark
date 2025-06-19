import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'

export interface ListboxValueTextBaseProps extends PolymorphicProps {
  /**
   * Text to display when no value is listboxed.
   */
  placeholder?: string | undefined
}
export interface ListboxValueTextProps extends HTMLProps<'span'>, ListboxValueTextBaseProps {}

export const ListboxValueText = forwardRef<HTMLSpanElement, ListboxValueTextProps>((props, ref) => {
  const { children, placeholder, ...localprops } = props
  const listbox = useListboxContext()
  const mergedProps = mergeProps(listbox.getValueTextProps(), localprops)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {children || listbox.valueAsString || placeholder}
    </ark.span>
  )
})

ListboxValueText.displayName = 'ListboxValueText'
