import type { Context } from '@zag-js/range-slider'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign, type Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { RangeSliderProvider } from './range-slider-context'
import { useRangeSlider } from './use-range-slider'

export type RangeSliderContext = Context & {
  modelValue?: Context['value']
}

export type UseRangeSliderProps = Assign<HTMLArkProps<'div'>, RangeSliderContext>

const VueProps = createVueProps<UseRangeSliderProps>({
  'aria-label': {
    type: Object as PropType<UseRangeSliderProps['aria-label']>,
  },
  'aria-labelledby': {
    type: Object as PropType<UseRangeSliderProps['aria-labelledby']>,
  },
  dir: {
    type: String as PropType<UseRangeSliderProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<UseRangeSliderProps['disabled']>,
  },
  form: {
    type: String as PropType<UseRangeSliderProps['form']>,
  },
  getAriaValueText: {
    type: Function as PropType<UseRangeSliderProps['getAriaValueText']>,
  },
  getRootNode: {
    type: Function as PropType<UseRangeSliderProps['getRootNode']>,
  },
  id: {
    type: String as PropType<UseRangeSliderProps['id']>,
  },
  ids: {
    type: Object as PropType<UseRangeSliderProps['ids']>,
  },
  invalid: {
    type: Boolean as PropType<UseRangeSliderProps['invalid']>,
  },
  max: {
    type: Number as PropType<UseRangeSliderProps['max']>,
  },
  min: {
    type: Number as PropType<UseRangeSliderProps['min']>,
  },
  minStepsBetweenThumbs: {
    type: Number as PropType<UseRangeSliderProps['minStepsBetweenThumbs']>,
  },
  modelValue: {
    type: Object as PropType<UseRangeSliderProps['modelValue']>,
  },
  name: {
    type: String as PropType<UseRangeSliderProps['name']>,
  },
  orientation: {
    type: String as PropType<UseRangeSliderProps['orientation']>,
  },
  readOnly: {
    type: Boolean as PropType<UseRangeSliderProps['readOnly']>,
  },
  step: {
    type: Number as PropType<UseRangeSliderProps['step']>,
  },
  thumbAlignment: {
    type: String as PropType<UseRangeSliderProps['thumbAlignment']>,
  },
  value: {
    type: Object as PropType<UseRangeSliderProps['value']>,
  },
})

export const RangeSlider: ComponentWithProps<Partial<UseRangeSliderProps>> = defineComponent({
  name: 'RangeSlider',
  props: VueProps,
  emits: ['change', 'update:modelValue', 'change-start', 'change-end'],
  setup(props, { slots, attrs, emit, expose }) {
    const api = useRangeSlider(emit, props)

    RangeSliderProvider(api)

    expose({
      context: api.value,
    })

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => slots?.default?.(api.value)}
      </ark.div>
    )
  },
})

export type RangeSliderProps = Optional<RangeSliderContext, 'id'>
