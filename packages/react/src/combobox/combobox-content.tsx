import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxContentProps = HTMLArkProps<'ul'>

export const ComboboxContent = forwardRef<'ul', ComboboxContentProps>((props, ref) => {
  const { contentProps } = useComboboxContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.ul {...mergedProps} ref={ref} />
})
