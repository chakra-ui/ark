import { mergeProps } from '@zag-js/vue'
import { Comment, Fragment, type VNode, cloneVNode, defineComponent } from 'vue'

export const Dynamic = defineComponent({
  name: 'Dynamic',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      if (!slots.default) return null
      const children = renderSlotFragments(slots.default())
      const index = children.findIndex((child) => child.type !== Comment)
      if (index === -1) return children

      const firstChildren = children[index]

      if (Object.keys(attrs).length > 0) {
        delete firstChildren.props?.ref
        // props are cleared below so `cloneVNode` doesn't merge the child's own props a second time
        const mergedProps = mergeProps(attrs, firstChildren.props ?? {})
        const cloned = cloneVNode({ ...firstChildren, props: {} }, mergedProps)

        if (children.length === 1) return cloned
        children[index] = cloned
        return children
      }

      return children
    }
  },
})

function renderSlotFragments(children?: VNode[]): VNode[] {
  if (!children) return []
  return children.flatMap((child) => {
    if (child.type === Fragment) return renderSlotFragments(child.children as VNode[])

    return [child]
  })
}
