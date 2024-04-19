import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { ClipboardProvider } from './clipboard-context'
import { emits, props } from './clipboard.props'
import { type UseClipboardProps, useClipboard } from './use-clipboard'

export interface ClipboardRootProps extends Assign<HTMLArkProps<'div'>, UseClipboardProps> {}

export const ClipboardRoot = defineComponent<ClipboardRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useClipboard(props, emit)
    ClipboardProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ClipboardRoot',
    props,
    emits,
  },
)
