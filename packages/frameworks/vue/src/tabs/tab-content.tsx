import { type ContentProps } from '@zag-js/tabs'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence, usePresencePropsContext } from '../presence'
import { emits } from '../presence/presence.props'
import type { Assign } from '../types'
import { useTabsContext } from './tabs-context'

export interface TabContentProps extends Assign<HTMLArkProps<'div'>, ContentProps> {}

export const TabContent = defineComponent<TabContentProps>(
  (props, { slots, attrs, emit }) => {
    const api = useTabsContext()
    const presenceProps = usePresencePropsContext()

    const usePresenceProps = computed(() => ({
      ...presenceProps.value,
      present: api.value.value === props.value,
    }))
    const presenceApi = usePresence(usePresenceProps, emit)

    PresenceProvider(presenceApi)

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.getContentProps(props)} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'TabContent',
    props: {
      value: {
        type: String as PropType<TabContentProps['value']>,
        required: true,
      },
    },
    emits,
  },
)
