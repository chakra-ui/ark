import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface CollapsibleTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    CollapsibleTriggerBaseProps {}

export const CollapsibleTrigger = (props: CollapsibleTriggerProps) => {
  const api = useCollapsibleContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)
  return <ark.button {...mergedProps} />
}
