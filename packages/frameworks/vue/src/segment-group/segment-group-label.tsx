import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'

export interface SegmentGroupLabelProps extends HTMLArkProps<'label'> {}

export const SegmentGroupLabel = defineComponent({
  name: 'SegmentGroupLabel',
  setup(_, { slots, attrs }) {
    const api = useSegmentGroupContext()

    return () => (
      <ark.label {...api.value.labelProps} {...segmentGroupAnatomy.build().label.attrs} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
})
