import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { Show } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useSelectContext } from './use-select-context'

export interface SelectPositionerBaseProps extends PolymorphicProps<'div'> {}
export interface SelectPositionerProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    SelectPositionerBaseProps {}

export const SelectPositioner = (props: SelectPositionerProps) => {
  const select = useSelectContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => select().getPositionerProps(), props)

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
