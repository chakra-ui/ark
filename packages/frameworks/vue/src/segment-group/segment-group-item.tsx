import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import type { ItemProps } from '@zag-js/radio-group'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSegmentGroupContext } from './segment-group-context'
import { SegmentGroupItemProvider } from './segment-group-item-context'

export interface SegmentGroupItemProps extends Assign<HTMLArkProps<'label'>, ItemProps> {}

// export const SegmentGroupItem = forwardRef<HTMLLabelElement, SegmentGroupItemProps>(
//   (props, ref) => {
//     const [itemProps, { children, ...localProps }] = createSplitProps<SegmentGroupItemContext>()(
//       props,
//       ['value', 'disabled', 'invalid'],
//     )

//     const api = useSegmentGroupContext()
//     const mergedProps = mergeProps(
//       api.getItemProps(itemProps),
//       parts.item.attrs as Record<string, string>,
//       localProps,
//     )

//     const itemState = api.getItemState(itemProps)
//     const view = runIfFn(children, itemState)

//     return (
//       <SegmentGroupItemProvider value={props}>
//         <ark.label {...mergedProps} ref={ref}>
//           {view}
//         </ark.label>
//       </SegmentGroupItemProvider>
//     )
//   },
// )

// SegmentGroupItem.displayName = 'SegmentGroupItem'

export const SegmentGroupItem = defineComponent({
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

  setup(props, { slots, attrs }) {
    const api = useSegmentGroupContext()
    SegmentGroupItemProvider(computed(() => props))

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
})
