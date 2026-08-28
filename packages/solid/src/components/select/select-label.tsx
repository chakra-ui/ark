import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useSelectContext } from './use-select-context.ts'

export interface SelectLabelBaseProps extends PolymorphicProps<'label'> {}
export interface SelectLabelProps extends HTMLProps<'label'>, SelectLabelBaseProps {}

export const SelectLabel = (props: SelectLabelProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
