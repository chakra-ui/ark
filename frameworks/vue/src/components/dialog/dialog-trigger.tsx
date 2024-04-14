import { computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './dialog-context'

export interface DialogTriggerProps extends HTMLArkProps<'button'> {}

export const DialogTrigger = defineComponent<DialogTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useDialogContext()
    const presenceApi = usePresenceContext()

    const triggerProps = computed(() => ({
      ...api.value.triggerProps,
      'aria-controls': presenceApi.value.isUnmounted
        ? undefined
        : api.value.triggerProps['aria-controls'],
    }))

    return () => (
      <ark.button {...triggerProps.value} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'DialogTrigger',
  },
)
