import type { StatusChangeDetails } from '@zag-js/avatar'
import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import type { Assign, ComponentFactory } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { AvatarProvider } from './avatar-context'
import { emits, props } from './avatar.props'
import { type UseAvatarProps, type UseAvatarReturn, useAvatar } from './use-avatar'

export interface AvatarRootProps extends Assign<HTMLArkProps<'div'>, UseAvatarProps> {}

export type AvatarRootEmits = {
  'status-change': [details: StatusChangeDetails]
}

export type AvatarRootSlots = SlotsType<{ default?: UnwrapRef<UseAvatarReturn> }>

type AvatarRootVueProps = ComponentFactory<AvatarRootProps, AvatarRootEmits>

export const AvatarRoot = defineComponent(
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
) as AvatarRootVueProps
