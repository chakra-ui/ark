import {
  AllowedComponentProps,
  cloneVNode,
  ComponentCustomProps,
  computed,
  isVNode,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
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

/**
 * Credit for useId(): @codebender828 & https://github.com/reach/reach-ui/blob/develop/packages/auto-id/src/index.tsx
 *
 */

let serverHandoffComplete = false
let _id = 1
const genId = () => ++_id

/**
 * Generates a unique id
 *
 * @param id external ID provided by consumer/user.
 * @param prefix prefix to append before the id
 */
export const useId = (id?: string, prefix?: string) => {
  const initialId = id || (serverHandoffComplete ? genId() : _id)
  const uid = ref(initialId)

  onBeforeMount(() => {
    if (serverHandoffComplete === false) {
      serverHandoffComplete = true
    }
  })

  onMounted(() => {
    if (uid.value === null) {
      uid.value = genId()
    }
  })

  return computed(() => {
    const __id__ = uid.value !== null ? uid.value.toString() : undefined
    return (prefix ? `${prefix}-${__id__}` : __id__) as string
  })
}

/**
 * For the component composables -- takes in the props object
 * and returns the props with a reactive context object
 */
export function transformComposableProps<T extends { context: object }>(props: T): T {
  return {
    ...props,
    context: reactive(props.context),
  }
}
