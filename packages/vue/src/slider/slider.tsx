import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { SliderProvider } from './slider-context'
import { useSlider, type UseSliderContext } from './use-slider'

export type SliderProps = Assign<HTMLArkProps<'div'>, UseSliderContext>

export const Slider: ComponentWithProps<SliderProps> = defineComponent({
  name: 'Slider',
  props: {
    'aria-label': {
      type: String as PropType<SliderProps['aria-label']>,
    },
    'aria-labelledby': {
      type: String as PropType<SliderProps['aria-labelledby']>,
    },
    dir: {
      type: String as PropType<SliderProps['dir']>,
    },
    disabled: {
      type: Boolean as PropType<SliderProps['disabled']>,
    },
    focusThumbOnChange: {
      type: Boolean as PropType<SliderProps['focusThumbOnChange']>,
    },
    form: {
      type: String as PropType<SliderProps['form']>,
    },
    getAriaValueText: {
      type: Function as PropType<SliderProps['getAriaValueText']>,
    },
    getRootNode: {
      type: Function as PropType<SliderProps['getRootNode']>,
    },
    id: {
      type: String as PropType<SliderProps['id']>,
    },
    ids: {
      type: Object as PropType<SliderProps['ids']>,
    },
    invalid: {
      type: Boolean as PropType<SliderProps['invalid']>,
    },
    max: {
      type: Number as PropType<SliderProps['max']>,
    },
    min: {
      type: Number as PropType<SliderProps['min']>,
    },
    modelValue: {
      type: Number as PropType<SliderProps['modelValue']>,
    },
    name: {
      type: String as PropType<SliderProps['name']>,
    },
    orientation: {
      type: String as PropType<SliderProps['orientation']>,
    },
    origin: {
      type: String as PropType<SliderProps['origin']>,
    },
    readOnly: {
      type: Boolean as PropType<SliderProps['readOnly']>,
    },
    step: {
      type: Number as PropType<SliderProps['step']>,
    },
    thumbAlignment: {
      type: String as PropType<SliderProps['thumbAlignment']>,
    },
    value: {
      type: Number as PropType<SliderProps['value']>,
    },
  },
  setup(props, { slots, attrs, emit, expose }) {
    const api = useSlider(emit, props)

    expose({
      context: api.value,
    })

    SliderProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
