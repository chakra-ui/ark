import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectPositionerBaseProps extends PolymorphicProps<'div'> {}
export interface CascadeSelectPositionerProps extends HTMLProps<'div'>, CascadeSelectPositionerBaseProps {}

export const CascadeSelectPositioner = (props: CascadeSelectPositionerProps) => {
  const context = useCascadeSelectContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => context().getPositionerProps(), props)

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
