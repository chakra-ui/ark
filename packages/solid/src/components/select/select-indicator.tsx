import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface SelectIndicatorProps extends HTMLProps<'div'>, SelectIndicatorBaseProps {}

export const SelectIndicator = (props: SelectIndicatorProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getIndicatorProps(), props)

  return <ark.div {...mergedProps} />
}
