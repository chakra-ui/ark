import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface CollapsibleIndicatorProps extends HTMLProps<'div'>, CollapsibleIndicatorBaseProps {}

export const CollapsibleIndicator = (props: CollapsibleIndicatorProps) => {
  const collapsible = useCollapsibleContext()
  const mergedProps = mergeProps(() => collapsible().getIndicatorProps(), props)

  return <ark.div {...mergedProps} />
}
