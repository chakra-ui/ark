import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverDescriptionBaseProps extends PolymorphicProps<'div'> {}
export interface PopoverDescriptionProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    PopoverDescriptionBaseProps {}

export const PopoverDescription = (props: PopoverDescriptionProps) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(() => api().getDescriptionProps(), props)

  return <ark.div {...mergedProps} />
}
