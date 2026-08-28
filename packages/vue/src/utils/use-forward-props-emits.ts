import { computed } from 'vue'
import { useEmitAsProps } from './use-emits-as-props.ts'
import { useForwardProps } from './use-forward-props.ts'

/**
 * Attribution: Radix Vue Team
 * Retrieved from: https://www.radix-vue.com/utilities/use-forward-props-emits.html
 */
export function useForwardPropsEmits<T extends Parameters<typeof useForwardProps>[0], Name extends string>(
  props: T,
  emit?: (name: Name, ...args: any[]) => void,
) {
  const parsedProps = useForwardProps(props)
  const emitsAsProps = emit ? useEmitAsProps(emit) : {}

  return computed(() => ({
    // @ts-expect-error
    ...parsedProps.value,
    ...emitsAsProps,
  }))
}
