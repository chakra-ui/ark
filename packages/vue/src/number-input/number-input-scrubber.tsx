import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useNumberInputContext } from './number-input-context'

export type NumberInputScrubberProps = HTMLArkProps<'div'>

export const NumberInputScrubber: ComponentWithProps<NumberInputScrubberProps> = defineComponent({
  name: 'NumberInputScrubber',
  setup(_, { slots, attrs }) {
    const api = useNumberInputContext()

    return () => (
      <ark.div {...api.value.scrubberProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
