import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import type { ItemProps } from '@zag-js/radio-group'
import { type PropType, computed, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { SegmentGroupItemProvider } from './use-segment-group-item-context'
import { SegmentGroupItemPropsProvider } from './use-segment-group-item-props-context'

export interface SegmentGroupItemProps extends Assign<HTMLArkProps<'label'>, ItemProps> {}

export const SegmentGroupItem = defineComponent<SegmentGroupItemProps>(
  (props, { slots, attrs }) => {
    const api = useSegmentGroupContext()
    SegmentGroupItemPropsProvider(props)
    SegmentGroupItemProvider(computed(() => api.value.getItemState(props)))

    return () => (
      <ark.label
        {...api.value.getItemProps(props)}
        {...segmentGroupAnatomy.build().item.attrs}
        {...attrs}
      >
        {() => slots.default?.(api.value.getItemState(props))}
      </ark.label>
    )
  },
  {
    name: 'SegmentGroupItem',
    props: {
      value: {
        type: String as PropType<ItemProps['value']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<ItemProps['disabled']>,
        default: undefined,
      },
      invalid: {
        type: Boolean as PropType<ItemProps['invalid']>,
        default: undefined,
      },
    },
  },
)
