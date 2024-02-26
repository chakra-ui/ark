import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type UsePresenceProps } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { RenderStrategyProvider } from '../render-strategy'
import { type Assign } from '../types'
import { TabsProvider } from './tabs-context'
import { emits, props } from './tabs.props'
import { useTabs, type UseTabsProps } from './use-tabs'

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
        {slots.default?.(api.value)}
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
