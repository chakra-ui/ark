import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectContentProps = HTMLArkProps<'ul'>

export const SelectContent = forwardRef<'ul', SelectContentProps>((props, ref) => {
  const { menuProps } = useSelectContext()
  const mergedProps = mergeProps(menuProps, props)

  return <ark.ul {...mergedProps} ref={ref} />
})
