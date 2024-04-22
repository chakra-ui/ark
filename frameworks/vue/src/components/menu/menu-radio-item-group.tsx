import { type PropType, computed, defineComponent } from 'vue'
import type { Assign, Optional } from '../../types'
import { useId } from '../../utils'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import {
  MenuItemGroupProvider,
  type RadioItemGroupProps,
  type UseMenuItemGroupContext,
} from './use-menu-item-group-context'

type OptionalItemGroupProps = Optional<RadioItemGroupProps, 'id'>

export interface MenuRadioItemGroupProps
  extends Assign<HTMLArkProps<'div'>, OptionalItemGroupProps> {
  modelValue?: string
}

export const MenuRadioItemGroup = defineComponent<MenuRadioItemGroupProps>(
  (props, { slots, attrs, emit }) => {
    const menu = useMenuContext()
    const id = useId()
    const itemGroupProps: UseMenuItemGroupContext = computed(() => ({
      id: props.id ? props.id : id.value,
      value: props.modelValue,
      onValueChange: (e) => emit('update:modelValue', e.value),
    }))
    MenuItemGroupProvider(itemGroupProps)

    return () => (
      <ark.div {...menu.value.getItemGroupProps(itemGroupProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuRadioItemGroup',
    props: {
      id: {
        type: String as PropType<MenuRadioItemGroupProps['id']>,
      },
      modelValue: {
        type: String as PropType<MenuRadioItemGroupProps['value']>,
      },
    },
    emits: ['update:modelValue'],
  },
)
