import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerPositionerBaseProps extends PolymorphicProps<'div'> {}
export interface DrawerPositionerProps extends HTMLProps<'div'>, DrawerPositionerBaseProps {}

export const DrawerPositioner = (props: DrawerPositionerProps) => {
  const drawer = useDrawerContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(() => drawer().getPositionerProps(), props)

  return (
    <Show when={!presence().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
