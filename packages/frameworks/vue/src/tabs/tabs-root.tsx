import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { PresencePropsProvider, type UsePresenceProps } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
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

    const presenceProps = computed(() => ({
      present: props.present,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    TabsProvider(api)
    PresencePropsProvider(presenceProps)

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
    emits: {
      ...emits,
      ...presenceEmits,
    },
  },
)
