import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useCollapsibleContext } from './use-collapsible-context.ts'

export interface CollapsibleIndicatorBaseProps extends PolymorphicProps<'span'> {}
export interface CollapsibleIndicatorProps extends HTMLProps<'span'>, CollapsibleIndicatorBaseProps {}

export const CollapsibleIndicator = (props: CollapsibleIndicatorProps) => {
  const collapsible = useCollapsibleContext()
  const mergedProps = mergeProps(() => collapsible().getIndicatorProps(), props)

  return <ark.span {...mergedProps} />
}
