import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresence } from '../presence'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerBackdropBaseProps extends PolymorphicProps<'div'> {}
export interface DrawerBackdropProps extends HTMLProps<'div'>, DrawerBackdropBaseProps {}

export const DrawerBackdrop = (props: DrawerBackdropProps) => {
  const drawer = useDrawerContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presence = usePresence(mergeProps(renderStrategyProps, () => ({ present: drawer().open })))
  const mergedProps = mergeProps(
    () => drawer().getBackdropProps(),
    () => presence().presenceProps,
    props,
  )

  return (
    <Show when={!presence().unmounted}>
      <ark.div {...mergedProps} ref={composeRefs(presence().ref, props.ref)} />
    </Show>
  )
}
