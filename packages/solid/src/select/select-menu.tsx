import { ark, HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectMenuProps = HTMLArkProps<'ul'>

export const SelectMenu = (props: SelectMenuProps) => {
  const select = useSelectContext()

  return <ark.ul {...select().menuProps} {...props} />
}
