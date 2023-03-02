import { defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useTagsInputContext } from './tags-input-context'

export type TagProps = { index: string | number; value: string; disabled?: boolean }

export const Tag: ComponentWithProps<Assign<HTMLArkProps<'div'>, TagProps>> = defineComponent({
  name: 'Tag',
  props: {
    index: {
      type: [String, Number] as PropType<TagProps['index']>,
      required: true,
    },
    value: {
      type: String as PropType<TagProps['value']>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<TagProps['disabled']>,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useTagsInputContext()

    return () => (
      <ark.div
        {...api.value.getTagProps({
          index: props.index,
          value: props.value,
          disabled: props.disabled,
        })}
        {...attrs}
      >
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
