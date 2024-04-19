import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseAvatarContext, useAvatarContext } from './use-avatar-context'

export type AvatarContextProps = SlotsType<{
  default: UnwrapRef<UseAvatarContext>
}>

export const AvatarContext = defineComponent(
  (_, { slots }) => {
    const avatar = useAvatarContext()

    return () => slots.default(avatar.value)
  },
  {
    name: 'AvatarContext',
    slots: Object as AvatarContextProps,
  },
)
