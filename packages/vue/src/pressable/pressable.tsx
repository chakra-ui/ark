import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { usePressable, type UsePressableContext } from './use-pressable'

export type PressableProps = Assign<HTMLArkProps<'button'>, UsePressableContext>

export const Pressable: ComponentWithProps<PressableProps> = defineComponent({
  name: 'Pressable',
  props: {
    isDisabled: {
      type: Boolean as PropType<PressableProps['isDisabled']>,
    },
    isCanceledOnExit: {
      type: Boolean as PropType<PressableProps['isCanceledOnExit']>,
    },
    preventFocusOnPress: {
      type: Boolean as PropType<PressableProps['preventFocusOnPress']>,
    },
    allowTextSelectionOnPress: {
      type: Boolean as PropType<PressableProps['allowTextSelectionOnPress']>,
    },
    dir: {
      type: String as PropType<PressableProps['dir']>,
    },
  },
  emits: ['press', 'longPress', 'pressEnd', 'pressUp', 'pressStart'],
  setup(props, { slots, attrs, emit }) {
    const api = usePressable(emit, props)
    return () => (
      <ark.button {...api.value.pressableProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.button>
    )
  },
})
