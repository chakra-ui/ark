import { mergeProps } from '@zag-js/vue'
import { Fragment, type VNode, cloneVNode, defineComponent } from 'vue'

export const Dynamic = defineComponent({
  name: 'Dynamic',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      if (!slots.default) return null
      const children = renderSlotFragments(slots.default())
      const [firstChildren, ...otherChildren] = children

      if (Object.keys(attrs).length > 0) {
        // biome-ignore lint/performance/noDelete: <explanation>
        delete firstChildren.props?.ref
        const mergedProps = mergeProps(attrs, firstChildren.props ?? {})
        const cloned = cloneVNode(firstChildren, mergedProps)
        for (const prop in mergedProps) {
          if (prop.startsWith('on')) {
            cloned.props ||= {}
            cloned.props[prop] = mergedProps[prop]
          }
        }

        return children.length === 1 ? cloned : [cloned, ...otherChildren]
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
