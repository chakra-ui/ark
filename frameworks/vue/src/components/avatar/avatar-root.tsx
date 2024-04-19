import type { StatusChangeDetails } from '@zag-js/avatar'
import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { emits, props } from './avatar.props'
import { type UseAvatarProps, useAvatar } from './use-avatar'
import { AvatarProvider } from './use-avatar-context'

export type AvatarRootEmits = {
  statusChange: [details: StatusChangeDetails]
}

export interface AvatarRootProps extends Assign<HTMLArkProps<'div'>, UseAvatarProps> {}

export const AvatarRoot = defineComponent<AvatarRootProps>(
  (props, { slots, attrs, emit }) => {
    const avatar = useAvatar(props, emit)
    AvatarProvider(avatar)

    return () => (
      <ark.div {...avatar.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'AvatarRoot',
    props,
    emits,
  },
)
