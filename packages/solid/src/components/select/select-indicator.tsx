import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useSelectContext } from './use-select-context.ts'

export interface SelectIndicatorBaseProps extends PolymorphicProps<'span'> {}
export interface SelectIndicatorProps extends HTMLProps<'span'>, SelectIndicatorBaseProps {}

export const SelectIndicator = (props: SelectIndicatorProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getIndicatorProps(), props)

  return <ark.span {...mergedProps} />
}
