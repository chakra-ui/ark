import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './menu-context'

export interface MenuPositionerProps extends HTMLArkProps<'div'> {}

export const MenuPositioner: ArkComponent<'div'> = (props: MenuPositionerProps) => {
  const api = useMenuContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().positionerProps, props)

  return (
    <Show when={!presenceApi().isUnmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
