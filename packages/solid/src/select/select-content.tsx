import { ark, HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectContentProps = HTMLArkProps<'ul'>

export const SelectContent = (props: SelectContentProps) => {
  const select = useSelectContext()

  return <ark.ul {...select().contentProps} {...props} />
}
