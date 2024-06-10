import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectListProps extends HTMLArkProps<'div'> {}

export const SelectList = (props: SelectListProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getListProps(), props)

  return <ark.div {...mergedProps} />
}
