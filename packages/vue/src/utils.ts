import { AllowedComponentProps, ComponentCustomProps, isVNode, Slots, VNode, VNodeProps } from 'vue'

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
