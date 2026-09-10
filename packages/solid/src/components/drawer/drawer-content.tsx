import type { ContentProps, ContentState } from '@zag-js/drawer'
import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePresenceContext } from '../presence/index.tsx'
import { useDrawerContext } from './use-drawer-context.ts'

export interface DrawerContentState extends ContentState {}

export interface DrawerContentBaseProps extends PolymorphicProps<'div', DrawerContentState>, ContentProps {}
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
      <ark.div {...mergedProps} ref={composeRefs(presence().ref, localProps.ref)} state={drawer().getContentState()} />
    </Show>
  )
}
