import type { ItemProps } from '@zag-js/accordion'
import { type PropType, computed, defineComponent } from 'vue'
import { Collapsible } from '../..'
import type { Assign } from '../../types'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import type { HTMLArkProps } from '../factory'
import { emits } from '../presence/presence.props'
import { useAccordionContext } from './use-accordion-context'
import { AccordionItemProvider } from './use-accordion-item-context'
import { AccordionItemPropsProvider } from './use-accordion-item-props-context'

export interface AccordionItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const AccordionItem = defineComponent<AccordionItemProps>(
  (props, { slots, attrs }) => {
    const accordion = useAccordionContext()
    const item = computed(() => accordion.value.getItemState(props))
    const itemContentProps = computed(() => accordion.value.getItemContentProps(props))
    const renderStrategyProps = useRenderStrategyContext()

    AccordionItemProvider(item)
    AccordionItemPropsProvider(props)

    return () => (
      // @ts-expect-error TODO fix dir typing
      <Collapsible.Root
        open={item.value.expanded}
        ids={{ content: itemContentProps.value.id }}
        {...accordion.value.getItemProps(props)}
        {...renderStrategyProps.value}
        {...attrs}
      >
        {slots.default?.()}
      </Collapsible.Root>
    )
  },
  {
    name: 'AccordionItem',
    props: {
      value: {
        type: String as PropType<ItemProps['value']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<ItemProps['disabled']>,
        default: undefined,
      },
    },
    emits,
  },
)
