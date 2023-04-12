import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { RangeSliderProvider } from './range-slider-context'
import { useRangeSlider, type UseRangeSliderContext } from './use-range-slider'

export type RangeSliderProps = Assign<HTMLArkProps<'div'>, UseRangeSliderContext>

export const RangeSlider: ComponentWithProps<RangeSliderProps> = defineComponent({
  name: 'RangeSlider',
  props: {
    'aria-label': {
      type: Object as PropType<RangeSliderProps['aria-label']>,
    },
    'aria-labelledby': {
      type: Object as PropType<RangeSliderProps['aria-labelledby']>,
    },
    dir: {
      type: String as PropType<RangeSliderProps['dir']>,
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
      type: Object as PropType<RangeSliderProps['modelValue']>,
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
      type: Object as PropType<RangeSliderProps['value']>,
    },
  },
  emits: ['change', 'update:modelValue', 'change-start', 'change-end'],
  setup(props, { slots, attrs, emit, expose }) {
    const api = useRangeSlider(emit, props)

    RangeSliderProvider(api)

    expose({
      context: api.value,
    })

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
