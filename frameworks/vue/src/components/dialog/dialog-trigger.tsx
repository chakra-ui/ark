import { computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogTriggerProps extends HTMLArkProps<'button'> {}

export const DialogTrigger = defineComponent<DialogTriggerProps>(
  (_, { slots, attrs }) => {
    const dialog = useDialogContext()
    const presencedialog = usePresenceContext()

    const triggerProps = computed(() => ({
      ...dialog.value.triggerProps,
      'aria-controls': presencedialog.value.unmounted
        ? undefined
        : dialog.value.triggerProps['aria-controls'],
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
