// import type { ItemProps } from '@zag-js/tree-view'
import { treeViewAnatomy } from '@ark-ui/anatomy'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type ItemProps } from './tree-view-context'

export interface TreeViewItemTextProps extends Assign<HTMLArkProps<'span'>, ItemProps> {}

export const TreeViewItemText = defineComponent<TreeViewItemTextProps>(
  (props, { slots, attrs }) => {
    const api = useTreeViewContext()

    return () => (
      <ark.span
        {...api.value.getItemProps(props)}
        {...treeViewAnatomy.build().itemText.attrs}
        {...attrs}
      >
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'TreeViewItemText',
    props: {
      depth: {
        type: Number as PropType<TreeViewItemTextProps['depth']>,
        required: true,
      },
      id: {
        type: String as PropType<TreeViewItemTextProps['id']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<TreeViewItemTextProps['disabled']>,
      },
    },
  },
)
