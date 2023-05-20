import { type TriggerProps } from '@zag-js/tabs'
import { defineComponent, h, type PropType } from 'vue'
import { useUniqueChild, type ComponentWithProps } from '../utils'
import { useTabsContext } from './tabs-context'

/** This type is here so that the script 'check-exports' passes
 *  because in Vue we don't pass 'children' as props
 */

export type TabTriggerProps = TriggerProps

export const TabTrigger: ComponentWithProps<TabTriggerProps> = defineComponent({
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
  setup(props, { slots, attrs }) {
    const api = useTabsContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'TabsTrigger')

      return h(DefaultSlot, {
        ...api.value.getTriggerProps({ value: props.value, disabled: props.disabled }),
        ...attrs,
      })
    }
  },
})
