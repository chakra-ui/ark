import type { Context } from '@zag-js/tags-input'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign, Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { TagsInputProvider } from './tags-input-context'
import { useTagsInput } from './use-tags-input'

export type TagsInputContext = Context & {
  modelValue?: Context['value']
}

export type UseTagsInputProps = Assign<HTMLArkProps<'div'>, TagsInputContext>

const VueTagsInputProps = createVueProps<UseTagsInputProps>({
  addOnPaste: {
    type: Boolean as PropType<UseTagsInputProps['addOnPaste']>,
  },
  allowEditTag: {
    type: Boolean as PropType<UseTagsInputProps['allowEditTag']>,
    default: true,
  },
  allowOverflow: {
    type: Boolean as PropType<UseTagsInputProps['allowOverflow']>,
  },
  autoFocus: {
    type: Boolean as PropType<UseTagsInputProps['autoFocus']>,
  },
  blurBehavior: {
    type: String as PropType<UseTagsInputProps['blurBehavior']>,
  },
  dir: {
    type: String as PropType<UseTagsInputProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<UseTagsInputProps['disabled']>,
  },
  form: {
    type: String as PropType<UseTagsInputProps['form']>,
  },
  getRootNode: {
    type: Function as PropType<UseTagsInputProps['getRootNode']>,
  },
  id: {
    type: String as PropType<UseTagsInputProps['id']>,
  },
  ids: {
    type: String as PropType<UseTagsInputProps['ids']>,
  },
  inputValue: {
    type: String as PropType<UseTagsInputProps['inputValue']>,
  },
  invalid: {
    type: Boolean as PropType<UseTagsInputProps['invalid']>,
  },
  max: {
    type: Number as PropType<UseTagsInputProps['max']>,
  },
  maxLength: {
    type: Number as PropType<UseTagsInputProps['maxLength']>,
  },
  modelValue: {
    type: Object as PropType<UseTagsInputProps['modelValue']>,
  },
  name: {
    type: String as PropType<UseTagsInputProps['name']>,
  },
  readOnly: {
    type: Boolean as PropType<UseTagsInputProps['readOnly']>,
  },
  translations: {
    type: Object as PropType<UseTagsInputProps['translations']>,
  },
  validate: {
    type: Function as PropType<UseTagsInputProps['validate']>,
  },
  value: {
    type: Object as PropType<UseTagsInputProps['value']>,
  },
})

export const TagsInput: ComponentWithProps<Partial<UseTagsInputProps>> = defineComponent({
  name: 'TagsInput',
  props: VueTagsInputProps,
  emits: ['change', 'update:modelValue', 'highlight', 'invalid', 'tag-update'],
  setup(props, { slots, attrs, emit, expose }) {
    const api = useTagsInput(emit, props)

    TagsInputProvider(api)

    expose({
      context: api,
    })

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => slots?.default?.(api.value)}
      </ark.div>
    )
  },
})

export type TagsInputProps = Optional<TagsInputContext, 'id'>
