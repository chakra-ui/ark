import { ark, HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectLabelProps = HTMLArkProps<'label'>

export const SelectLabel = (props: SelectLabelProps) => {
  const select = useSelectContext()

  return <ark.label {...select().labelProps} {...props} />
}
