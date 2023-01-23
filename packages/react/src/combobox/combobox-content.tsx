import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxContentProps = HTMLArkProps<'div'>

export const ComboboxContent = forwardRef<'div', ComboboxContentProps>((props, ref) => {
  const { contentProps } = useComboboxContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
