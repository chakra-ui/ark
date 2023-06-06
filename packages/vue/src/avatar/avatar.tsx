import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { AvatarProvider } from './avatar-context'
import { useAvatar, type UseAvatarContext } from './use-avatar'

export type AvatarProps = Assign<HTMLArkProps<'div'>, UseAvatarContext>

const VueProps = createVueProps<AvatarProps>({
  getRootNode: {
    type: Function as PropType<AvatarProps['getRootNode']>,
  },
  id: {
    type: String as PropType<AvatarProps['id']>,
  },
})

export const Avatar: ComponentWithProps<AvatarProps> = defineComponent({
  name: 'Avatar',
  props: VueProps,
  emits: ['error', 'load'],
  setup(props, { emit, attrs, slots }) {
    const api = useAvatar(emit, props)

    AvatarProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
