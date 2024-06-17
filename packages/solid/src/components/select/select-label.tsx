import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectLabelBaseProps extends PolymorphicProps<'label'> {}
export interface SelectLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    SelectLabelBaseProps {}

export const SelectLabel = (props: SelectLabelProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
