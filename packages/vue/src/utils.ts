import {
  Fragment,
  cloneVNode,
  computed,
  isVNode,
  reactive,
  ref,
  type AllowedComponentProps,
  type ComponentCustomProps,
  type Slots,
  type VNode,
  type VNodeProps,
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

let _id = 0
const genId = () => ++_id

/**
 * Generates a unique id
 *
 * @param id external ID provided by consumer/user.
 * @param prefix prefix to append before the id
 */
export const useId = (id?: string, prefix?: string) => {
  const initialId = id || genId()
  const uid = ref(initialId)

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

/**
 * Checks whether a given VNode is a render-vialble element.
 */
export function isValidVNodeElement(input: any): boolean {
  // No children
  if (input == null) return false
  // Raw HTML elements like 'div', 'span', e.t.c.
  if (typeof input.type === 'string') return true
  // Other Vue component objects
  if (typeof input.type === 'object') return true
  // Functional components
  if (typeof input.type === 'function') return true
  // HTML Comment nodes or Text nodes
  return false
}

/**
 * Recursively flattens the Fragment descendants of a given VNode.
 *
 * When you create a component and pass a <slot />, Vue wraps
 * the contents of <slot /> inside a <Fragment /> component and assigns
 * the <slot /> VNode a type of Fragment.
 *
 * So why are we flattening here? Vue renders VNodes from the leaf
 * nodes going up to the root. In other words, when executing the render function
 * of each component, it executes the child render functions first before the parents.
 *
 * This means that at any components render function execution context, all it's children
 * VNodes should have already been rendered -- and that includes any slots! :D
 *
 * In the cases where we pass in a component with slots to the `asChild` component,
 * we shall need to flatten those slot fragment VNodes so as to extract all it's children VNodes
 * to correctly apply the props and event listeners from the with as child components.
 *
 * We do this recursively to ensure that all first child slots that contain fragments in their descendants are rendered into VNodes before passing events.
 * to the first actual element VNode.
 */
export function renderSlotFragments(children: VNode[]): VNode[] {
  return children.flatMap((child) => {
    if (child.type === Fragment) {
      return renderSlotFragments(child.children as VNode[])
    }
    return [child]
  })
}

/**
 * We use our own `mergeProps` instead of Vue's mergeProps to correctly handle event listeners.
 *
 * Credit: headless-ui/vue: https://github.com/tailwindlabs/headlessui/blob/main/packages/@headlessui-vue/src/utils/render.ts#L196
 */
export function mergeProps(...propsArgs: Record<any, any>[]) {
  if (propsArgs.length === 0) return {}
  if (propsArgs.length === 1) return propsArgs[0]

  const target: Record<any, any> = {}

  const eventHandlers: Record<
    string,
    ((event: { defaultPrevented: boolean }, ...args: any[]) => void | undefined)[]
  > = {}

  for (const props of propsArgs) {
    for (const prop in props) {
      // Collect event handlers
      if (prop.startsWith('on') && typeof props[prop] === 'function') {
        eventHandlers[prop] ??= []
        eventHandlers[prop].push(props[prop])
      } else {
        // Override incoming prop
        target[prop] = props[prop]
      }
    }
  }

  // Do not bind any event handlers when there is a `disabled` or `aria-disabled` prop set.
  if (target.disabled || target['aria-disabled']) {
    return Object.assign(
      target,
      // Set all event listeners that we collected to `undefined` so that `cloneVNode` from Vue doesn't drop them. `cloneVNode` only merges the
      // existing and new props, they don't just override therefore we have to
      // explicitly declare and nullify them.
      Object.fromEntries(Object.keys(eventHandlers).map((eventName) => [eventName, undefined])),
    )
  }

  // Merge event handlers
  for (const eventName in eventHandlers) {
    Object.assign(target, {
      [eventName](event: { defaultPrevented: boolean }, ...args: any[]) {
        const handlers = eventHandlers[eventName]

        for (const handler of handlers) {
          if (event instanceof Event && event.defaultPrevented) {
            return
          }

          handler(event, ...args)
        }
      },
    })
  }

  return target
}
