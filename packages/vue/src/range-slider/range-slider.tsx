import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { RangeSliderProvider } from './range-slider-context'
import { useRangeSlider, type UseRangeSliderProps } from './use-range-slider'

export type RangeSliderProps = Assign<HTMLArkProps<'div'>, UseRangeSliderProps>

const VueProps = createVueProps<RangeSliderProps>({
  'aria-label': {
    type: Object as PropType<RangeSliderProps['aria-label']>,
  },
  'aria-labelledby': {
    type: Object as PropType<RangeSliderProps['aria-labelledby']>,
  },
  dir: {
    type: String as PropType<RangeSliderProps['dir']>,
  },
  defaultValue: {
    type: Array as PropType<RangeSliderProps['defaultValue']>,
  },
  disabled: {
    type: Boolean as PropType<RangeSliderProps['disabled']>,
  },
  form: {
    type: String as PropType<RangeSliderProps['form']>,
  },
  getAriaValueText: {
    type: Function as PropType<RangeSliderProps['getAriaValueText']>,
  },
  getRootNode: {
    type: Function as PropType<RangeSliderProps['getRootNode']>,
  },
  id: {
    type: String as PropType<RangeSliderProps['id']>,
  },
  ids: {
    type: Object as PropType<RangeSliderProps['ids']>,
  },
  invalid: {
    type: Boolean as PropType<RangeSliderProps['invalid']>,
  },
  max: {
    type: Number as PropType<RangeSliderProps['max']>,
  },
  min: {
    type: Number as PropType<RangeSliderProps['min']>,
  },
  minStepsBetweenThumbs: {
    type: Number as PropType<RangeSliderProps['minStepsBetweenThumbs']>,
  },
  modelValue: {
    type: Array as PropType<RangeSliderProps['modelValue']>,
  },
  name: {
    type: String as PropType<RangeSliderProps['name']>,
  },
  orientation: {
    type: String as PropType<RangeSliderProps['orientation']>,
  },
  readOnly: {
    type: Boolean as PropType<RangeSliderProps['readOnly']>,
  },
  step: {
    type: Number as PropType<RangeSliderProps['step']>,
  },
  thumbAlignment: {
    type: String as PropType<RangeSliderProps['thumbAlignment']>,
  },
  value: {
    type: Array as PropType<RangeSliderProps['value']>,
  },
})

export const RangeSlider: ComponentWithProps<RangeSliderProps> = defineComponent({
  name: 'RangeSlider',
  props: VueProps,
  emits: ['change', 'update:modelValue', 'change-start', 'change-end'],
  setup(props, { slots, attrs, emit }) {
    const api = useRangeSlider(emit, props)

    RangeSliderProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots?.default?.(api.value)}
      </ark.div>
    )
  },
})
