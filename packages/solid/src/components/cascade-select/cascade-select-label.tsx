import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectLabelBaseProps extends PolymorphicProps<'label'> {}
export interface CascadeSelectLabelProps extends HTMLProps<'label'>, CascadeSelectLabelBaseProps {}

export const CascadeSelectLabel = (props: CascadeSelectLabelProps) => {
  const context = useCascadeSelectContext()
  const mergedProps = mergeProps(() => context().getLabelProps(), props)
  return <ark.label {...mergedProps} />
}
