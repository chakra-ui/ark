import { computed, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { RenderStrategyProvider } from '../../utils/render-strategy'
import { type HTMLArkProps, ark } from '../factory'
import type { UsePresenceProps } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { emits, props } from './tabs.props'
import { type UseTabsProps, useTabs } from './use-tabs'
import { TabsProvider } from './use-tabs-context'

export interface TabsRootProps
  extends Assign<HTMLArkProps<'div'>, UseTabsProps>,
    UsePresenceProps {}

export const TabsRoot = defineComponent<TabsRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useTabs(props, emit)

    const renderStrategyProps = computed(() => ({
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    TabsProvider(api)
    RenderStrategyProvider(renderStrategyProps)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'TabsRoot',
    props: {
      ...props,
      ...presenceProps,
    },
    emits: [...emits, ...presenceEmits],
  },
)
