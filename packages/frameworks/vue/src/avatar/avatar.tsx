import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { AvatarProvider } from './avatar-context'
import { emits, avatarProps as props } from './avatar.props'
import { useAvatar, type UseAvatarProps } from './use-avatar'

export interface AvatarProps extends Assign<HTMLArkProps<'div'>, UseAvatarProps> {}

export const Avatar = defineComponent<AvatarProps>(
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
    name: 'Avatar',
    props,
    emits,
  },
)
