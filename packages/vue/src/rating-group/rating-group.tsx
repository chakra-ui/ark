import type { Context } from '@zag-js/rating-group'
import { defineComponent, Fragment, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign, Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { RatingGroupProvider } from './rating-group-context'
import { useRatingGroup } from './use-rating-group'

export type RatingGroupContext = Context & {
  modelValue?: RatingGroupContext['value']
}

export type UseRatingGroupProps = Assign<HTMLArkProps<'input'>, RatingGroupContext>

const vueRatingGroupProps = createVueProps<UseRatingGroupProps>({
  id: {
    type: String as PropType<UseRatingGroupProps['id']>,
  },
  allowHalf: {
    type: Boolean as PropType<UseRatingGroupProps['allowHalf']>,
  },
  autoFocus: {
    type: Boolean as PropType<UseRatingGroupProps['autoFocus']>,
  },
  dir: {
    type: String as PropType<UseRatingGroupProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<UseRatingGroupProps['disabled']>,
  },
  form: {
    type: String as PropType<UseRatingGroupProps['form']>,
  },
  getRootNode: {
    type: Function as PropType<UseRatingGroupProps['getRootNode']>,
  },
  ids: {
    type: Object as PropType<UseRatingGroupProps['ids']>,
  },
  max: {
    type: Number as PropType<UseRatingGroupProps['max']>,
  },
  modelValue: {
    type: Number as PropType<UseRatingGroupProps['modelValue']>,
  },
  name: {
    type: String as PropType<UseRatingGroupProps['name']>,
  },
  readOnly: {
    type: Boolean as PropType<UseRatingGroupProps['readOnly']>,
  },
  translations: {
    type: Object as PropType<UseRatingGroupProps['translations']>,
  },
  value: {
    type: Number as PropType<UseRatingGroupProps['value']>,
  },
})

export const RatingGroup: ComponentWithProps<Partial<UseRatingGroupProps>> = defineComponent({
  name: 'RatingGroup',
  props: vueRatingGroupProps,
  emits: ['change', 'update:modelValue', 'hover'],
  setup(props, { slots, attrs, emit }) {
    const api = useRatingGroup(emit, props)

    RatingGroupProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        <Fragment>
          <ark.input {...api.value.hiddenInputProps} />
          {slots.default?.(api.value)}
        </Fragment>
      </ark.div>
    )
  },
})

export type RatingGroupProps = Optional<RatingGroupContext, 'id'>
