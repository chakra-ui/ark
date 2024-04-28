import {
  type MaybeRefOrGetter,
  type UnwrapRef,
  camelize,
  computed,
  getCurrentInstance,
  toRef,
} from 'vue'

interface PropOptions {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type?: any
  required?: boolean
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  default?: any
}

/**
 * Attribution: Radix Vue Team
 * Retrieved from: https://www.radix-vue.com/utilities/use-forward-props.html
 */
export function useForwardProps<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  T extends MaybeRefOrGetter<Record<string, any>>,
  U extends UnwrapRef<T>,
>(props: T) {
  const vm = getCurrentInstance()
  // Default value for declared props
  const defaultProps = Object.keys(vm?.type.props ?? {}).reduce((prev, curr) => {
    const defaultValue = (vm?.type.props[curr] as PropOptions).default
    if (defaultValue !== undefined) prev[curr as keyof U] = defaultValue
    return prev
  }, {} as U)

  const refProps = toRef(props)
  return computed(() => {
    const preservedProps = {} as U
    const assignedProps = vm?.vnode.props ?? {}

    // biome-ignore lint/complexity/noForEach: <explanation>
    Object.keys(assignedProps).forEach((key) => {
      preservedProps[camelize(key) as keyof U] = assignedProps[key]
    })

    // @ts-expect-error
    return Object.keys({ ...defaultProps, ...preservedProps }).reduce((prev, curr) => {
      if (refProps.value[curr] !== undefined) prev[curr as keyof U] = refProps.value[curr]
      return prev
    }, {} as U)
  })
}
