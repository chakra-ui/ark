import type { StatusChangeDetails } from '@zag-js/avatar'
import type { Direction } from '@zag-js/types'
import { type PropType, defineComponent } from 'vue'
import { ark } from '../factory'
import { useAvatar } from './use-avatar'
import { AvatarProvider } from './use-avatar-context'

export interface AvatarRootProps {
  id?: string
  dir?: Direction
}

export type AvatarRootEmits = {
  statusChange: [details: StatusChangeDetails]
}

export interface AvatarRootPropsWithEmits extends AvatarRootProps {
  onStatusChange?: (details: StatusChangeDetails) => void
}

export const AvatarRoot = defineComponent<AvatarRootPropsWithEmits>(
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
    props: {
      dir: {
        type: String as PropType<AvatarRootProps['dir']>,
      },
      id: {
        type: String as PropType<AvatarRootProps['id']>,
      },
    },
    emits: ['statusChange'],
  },
)
