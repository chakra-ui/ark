import { computed, defineComponent, ref, type PropType } from 'vue'
import type { ComponentWithProps } from '../utils'
import { EnvironmentProvider } from './environment-context'

export type EnvironmentProps = { value?: ShadowRoot | Document | Node }

export const Environment: ComponentWithProps<EnvironmentProps> = defineComponent({
  name: 'Environment',
  props: {
    value: Object as PropType<EnvironmentProps['value']>,
  },
  setup(props, { slots }) {
    const elRef = ref<HTMLSpanElement>()

    const currentEnv = computed(() => () => props.value ?? elRef.value?.ownerDocument ?? document)

    const showSpan = !props.value

    EnvironmentProvider(currentEnv.value)

    return () => (
      <>
        {slots.default?.()}
        {showSpan ? <span hidden ref={elRef} /> : null}
      </>
    )
  },
})
