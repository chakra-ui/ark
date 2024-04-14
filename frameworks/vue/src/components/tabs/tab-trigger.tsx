import type { TriggerProps } from '@zag-js/tabs'
import { type PropType, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { useTabsContext } from './tabs-context'

export interface TabTriggerProps extends Assign<HTMLArkProps<'button'>, TriggerProps> {}

export const TabTrigger = defineComponent<TabTriggerProps>(
  (props, { slots, attrs }) => {
    const api = useTabsContext()

    return () => (
      <ark.button {...api.value.getTriggerProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'TabTrigger',
    props: {
      value: {
        type: String as PropType<TabTriggerProps['value']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<TabTriggerProps['disabled']>,
      },
    },
  },
)
