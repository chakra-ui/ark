import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import type { ContentProps } from '@zag-js/drawer'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'
import { usePresenceContext } from '../presence'
import { composeRefs } from '../../utils/compose-refs'

export interface DrawerContentBaseProps extends PolymorphicProps<'div'>, ContentProps {}
export interface DrawerContentProps extends Omit<HTMLProps<'div'>, 'draggable'>, DrawerContentBaseProps {}

export const DrawerContent = (props: DrawerContentProps) => {
  const [contentProps, localProps] = createSplitProps<ContentProps>()(props, ['draggable'])
  const drawer = useDrawerContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(
    () => drawer().getContentProps({ draggable: true, ...contentProps }),
    () => presence().presenceProps,
    localProps,
  )

  return (
    <Show when={!presence().unmounted}>
      <ark.div {...mergedProps} ref={composeRefs(presence().ref, localProps.ref)} />
    </Show>
  )
}
