import type { ContentProps } from '@zag-js/tabs'
import { type PropType, computed, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type HTMLArkProps, ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { emits } from '../presence/presence.props'
import { useTabsContext } from './tabs-context'

export interface TabContentProps extends Assign<HTMLArkProps<'div'>, ContentProps> {}

export const TabContent = defineComponent<TabContentProps>(
  (props, { slots, attrs, emit }) => {
    const api = useTabsContext()
    const renderStrategyProps = useRenderStrategyContext()

    const usePresenceProps = computed(() => ({
      ...renderStrategyProps.value,
      present: api.value.value === props.value,
    }))
    const presenceApi = usePresence(usePresenceProps, emit)

    PresenceProvider(presenceApi)

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div
            {...api.value.getContentProps(props)}
            {...presenceApi.value.presenceProps}
            {...attrs}
          >
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
