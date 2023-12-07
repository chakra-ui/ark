import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputScrubberProps extends HTMLArkProps<'div'> {}

export const NumberInputScrubber = defineComponent({
  name: 'NumberInputScrubber',
  setup(_, { slots, attrs }) {
    const api = useNumberInputContext()

    return () => (
      <ark.div {...api.value.scrubberProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
