import {
  AllowedComponentProps,
  cloneVNode,
  ComponentCustomProps,
  isVNode,
  Slots,
  VNode,
  VNodeProps,
} from 'vue'

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param slots vue slots
 *
 * see https://github.com/vuejs/vue-next/blob/HEAD/packages/runtime-core/src/helpers/renderSlot.ts
 */
export function getValidChildren(slots: Slots | null): VNode[] {
  const slotArray = slots?.default?.() || []
  return slotArray.filter((child) => {
    return isVNode(child)
  })
}

export type ComponentWithProps<P> = {
  new (): {
    $props: AllowedComponentProps &
      ComponentCustomProps &
      VNodeProps & { props?: Record<keyof P, any> } & P & {
        [key: string]: unknown
      }
  }
}

/**
 * Returns a copy of only the valid default slot
 *
 * @param slots - the slots object from the component setup
 * @param componentName component display name for thrown errors
 * @returns A VNode clone of the default slot
 */
export function useUniqueChild(slots: Slots, componentName: string) {
  const validChildren = getValidChildren(slots)
  if (validChildren.length > 1) {
    const errorMessage = `[${componentName}] : ${componentName} can only have one root element.`
    console.error(errorMessage)
    throw new SyntaxError(errorMessage)
  }
  const DefaultSlot = cloneVNode(validChildren[0])

  return DefaultSlot
}
