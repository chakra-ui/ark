import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useComboboxContext } from './combobox-context'

export type ComboboxContentProps = HTMLArkProps<'ul'>

export const ComboboxContent = forwardRef<'ul'>((props, ref) => {
  const { contentProps } = useComboboxContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.ul {...mergedProps} ref={ref} />
})
