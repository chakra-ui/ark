import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectControlBaseProps extends PolymorphicProps<'div'> {}
export interface CascadeSelectControlProps extends HTMLProps<'div'>, CascadeSelectControlBaseProps {}

export const CascadeSelectControl = (props: CascadeSelectControlProps) => {
  const context = useCascadeSelectContext()
  const mergedProps = mergeProps(() => context().getControlProps(), props)
  return <ark.div {...mergedProps} />
}
