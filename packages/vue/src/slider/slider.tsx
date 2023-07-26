import type { Context } from '@zag-js/slider'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign, type Optional } from '../types'
import { createVueProps, getValidChildren, type ComponentWithProps } from '../utils'
import { SliderProvider } from './slider-context'
import { useSlider } from './use-slider'

export type SliderContext = Context & {
  modelValue?: Context['value']
}

export type UseSliderProps = Assign<HTMLArkProps<'div'>, SliderContext>

const VueProps = createVueProps<UseSliderProps>({
  'aria-label': {
    type: String as PropType<UseSliderProps['aria-label']>,
  },
  'aria-labelledby': {
    type: String as PropType<UseSliderProps['aria-labelledby']>,
  },
  dir: {
    type: String as PropType<UseSliderProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<UseSliderProps['disabled']>,
  },
  focusThumbOnChange: {
    type: Boolean as PropType<UseSliderProps['focusThumbOnChange']>,
  },
  form: {
    type: String as PropType<UseSliderProps['form']>,
  },
  getAriaValueText: {
    type: Function as PropType<UseSliderProps['getAriaValueText']>,
  },
  getRootNode: {
    type: Function as PropType<UseSliderProps['getRootNode']>,
  },
  id: {
    type: String as PropType<UseSliderProps['id']>,
  },
  ids: {
    type: Object as PropType<UseSliderProps['ids']>,
  },
  invalid: {
    type: Boolean as PropType<UseSliderProps['invalid']>,
  },
  max: {
    type: Number as PropType<UseSliderProps['max']>,
  },
  min: {
    type: Number as PropType<UseSliderProps['min']>,
  },
  modelValue: {
    type: Number as PropType<UseSliderProps['modelValue']>,
  },
  name: {
    type: String as PropType<UseSliderProps['name']>,
  },
  orientation: {
    type: String as PropType<UseSliderProps['orientation']>,
  },
  origin: {
    type: String as PropType<UseSliderProps['origin']>,
  },
  readOnly: {
    type: Boolean as PropType<UseSliderProps['readOnly']>,
  },
  step: {
    type: Number as PropType<UseSliderProps['step']>,
  },
  thumbAlignment: {
    type: String as PropType<UseSliderProps['thumbAlignment']>,
  },
  value: {
    type: Number as PropType<UseSliderProps['value']>,
  },
})

export const Slider: ComponentWithProps<Partial<UseSliderProps>> = defineComponent({
  name: 'Slider',
  props: VueProps,
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

export type SliderProps = Optional<SliderContext, 'id'>
