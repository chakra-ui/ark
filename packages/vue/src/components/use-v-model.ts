import {
  type Ref,
  type UnwrapRef,
  type WritableComputedRef,
  computed,
  getCurrentInstance,
  nextTick,
  ref,
  watch,
} from 'vue'

export interface UseVModelOptions<T, Passive extends boolean = false> {
  /**
   * When passive is set to `true`, it will use `watch` to sync with props and ref.
   * Instead of relying on the `v-model` or `.sync` to work.
   *
   * @default false
   */
  passive?: Passive
  /**
   * When eventName is set, it's value will be used to overwrite the emit event name.
   *
   * @default undefined
   */
  eventName?: string[]

  /**
   * Defining default value for return ref when no value is passed.
   *
   * @default undefined
   */
  defaultValue?: T
}

export function useVModel<P extends object, K extends keyof P, Name extends string>(
  props: P,
  key?: K,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  emit?: (name: Name, ...args: any[]) => void,
  options?: UseVModelOptions<P[K], false>,
): WritableComputedRef<NonNullable<P[K]>>

export function useVModel<P extends object, K extends keyof P, Name extends string>(
  props: P,
  key?: K,
  emit?: (name: Name, ...args: undefined[]) => void,
  options?: UseVModelOptions<P[K], true>,
): Ref<UnwrapRef<P[K]>>

export function useVModel<
  P extends object,
  K extends keyof P,
  Name extends string,
  Passive extends boolean,
>(
  props: P,
  key?: K,
  emit?: (name: Name, ...args: undefined[]) => void,
  options: UseVModelOptions<P[K], Passive> = {},
) {
  const { passive = false, eventName, defaultValue } = options

  const vm = getCurrentInstance()
  // @ts-expect-error mis-alignment with @vue/composition-api
  const _emit = emit || vm?.emit || vm?.$emit?.bind(vm) || vm?.proxy?.$emit?.bind(vm?.proxy)

  const prop = key || ('modelValue' as K)
  const getValue = () => props[prop] ?? defaultValue

  const triggerEmit = (value: P[K]) => {
    if (!eventName) {
      _emit(eventName || `update:${prop.toString()}`, value)
      //
    } else {
      //
      for (const event of eventName) {
        _emit(event, value)
      }
    }
  }

  if (passive) {
    const initialValue = getValue() as P[K]
    const proxy = ref<P[K]>(initialValue)
    let isUpdating = false

    watch(
      () => props[prop],
      (v) => {
        if (!isUpdating) {
          isUpdating = true
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          ;(proxy as any).value = v as UnwrapRef<P[K]>
          nextTick(() => {
            isUpdating = false
          })
        }
      },
    )

    watch(proxy, (v) => {
      if (!isUpdating && v !== props[prop]) {
        triggerEmit(v as P[K])
      }
    })

    return proxy
  }

  return computed<P[K]>({
    get() {
      return getValue() as P[K]
    },
    set(value) {
      triggerEmit(value)
    },
  })
}
