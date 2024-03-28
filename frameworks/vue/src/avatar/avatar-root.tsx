import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { AvatarProvider } from './avatar-context'
import { emits, props } from './avatar.props'
import { useAvatar, type UseAvatarProps } from './use-avatar'

export interface AvatarRootProps extends Assign<HTMLArkProps<'div'>, UseAvatarProps> {}

export const AvatarRoot = defineComponent<AvatarRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useAvatar(props, emit)
    AvatarProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'AvatarRoot',
    props,
    emits,
  },
)
