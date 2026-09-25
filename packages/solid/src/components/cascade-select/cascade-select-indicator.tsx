import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface CascadeSelectIndicatorProps extends HTMLProps<'div'>, CascadeSelectIndicatorBaseProps {}

export const CascadeSelectIndicator = (props: CascadeSelectIndicatorProps) => {
  const context = useCascadeSelectContext()
  const mergedProps = mergeProps(() => context().getIndicatorProps(), props)
  return <ark.div {...mergedProps} />
}
