import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSelectContext } from './select-context'

export type SelectContentProps = HTMLArkProps<'ul'>

export const SelectContent = forwardRef<'ul', SelectContentProps>((props, ref) => {
  const { contentProps } = useSelectContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.ul {...mergedProps} ref={ref} />
})
