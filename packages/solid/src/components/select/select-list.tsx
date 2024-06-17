import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectListBaseProps extends PolymorphicProps<'div'> {}
export interface SelectListProps extends HTMLProps<'div'>, SelectListBaseProps {}

export const SelectList = (props: SelectListProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getListProps(), props)

  return <ark.div {...mergedProps} />
}
