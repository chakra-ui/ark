import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioControlProps = HTMLArkProps<'div'>

export const RadioControl: ComponentWithProps<RadioControlProps> = defineComponent({
  name: 'RadioControl',
  setup(_, { slots, attrs }) {
    const groupApi = useRadioGroupContext()
    const api = useRadioContext()

    return () => (
      <>
        <ark.div {...groupApi.value.getRadioControlProps(api)} {...attrs}>
          {() => getValidChildren(slots)}
        </ark.div>
        <input {...groupApi.value.getRadioHiddenInputProps(api)} />
      </>
    )
  },
})
