import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectMenuProps = HTMLArkProps<'ul'>

export const SelectMenu = forwardRef<'ul', SelectMenuProps>((props, ref) => {
  const { menuProps } = useSelectContext()
  const mergedProps = mergeProps(menuProps, props)

  return <ark.ul {...mergedProps} ref={ref} />
})
