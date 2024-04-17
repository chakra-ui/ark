import { camelize, getCurrentInstance, toHandlerKey } from 'vue'

/**
 * Attribution: Radix Vue Team
 * Retrieved from: https://www.radix-vue.com/utilities/use-emit-as-props.html
 */
export function useEmitAsProps<Name extends string>(emit: (name: Name, ...args: any[]) => void) {
  const vm = getCurrentInstance()

  const events = vm?.type.emits as Name[]
  const result: Record<string, any> = {}

  if (!events?.length) {
    console.warn(`No emitted event found. Please check component: ${vm?.type.__name}`)
  }

  for (const event of events) {
    result[toHandlerKey(camelize(event))] = (...arg: any) => emit(event, ...arg)
  }

  return result
}
