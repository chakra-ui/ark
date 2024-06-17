import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectListBaseProps extends PolymorphicProps<'div'> {}
export interface SelectListProps extends JSX.HTMLAttributes<HTMLDivElement>, SelectListBaseProps {}

export const SelectList = (props: SelectListProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getListProps(), props)

  return <ark.div {...mergedProps} />
}
