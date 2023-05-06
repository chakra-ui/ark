import type { Context } from '@zag-js/tags-input'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import type { TagInputProps } from './tag-input'
import { TagsInputProvider } from './tags-input-context'
import { useTagsInput } from './use-tags-input'

export type TagsInputContext = Context & {
  modelValue?: Context['value']
}

export type TagsInputProps = Assign<HTMLArkProps<'div'>, TagsInputContext>

const VueTagsInputProps = createVueProps<TagsInputProps>({
  addOnPaste: {
    type: Boolean as PropType<TagsInputProps['addOnPaste']>,
  },
  allowEditTag: {
    type: Boolean as PropType<TagsInputProps['allowEditTag']>,
    default: true,
  },
  allowOverflow: {
    type: Boolean as PropType<TagsInputProps['allowOverflow']>,
  },
  autoFocus: {
    type: Boolean as PropType<TagsInputProps['autoFocus']>,
  },
  blurBehavior: {
    type: String as PropType<TagsInputProps['blurBehavior']>,
  },
  dir: {
    type: String as PropType<TagsInputProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<TagsInputProps['disabled']>,
  },
  form: {
    type: String as PropType<TagsInputProps['form']>,
  },
  getRootNode: {
    type: Function as PropType<TagsInputProps['getRootNode']>,
  },
  id: {
    type: String as PropType<TagsInputProps['id']>,
  },
  ids: {
    type: String as PropType<TagsInputProps['ids']>,
  },
  inputValue: {
    type: String as PropType<TagsInputProps['inputValue']>,
  },
  invalid: {
    type: Boolean as PropType<TagsInputProps['invalid']>,
  },
  max: {
    type: Number as PropType<TagsInputProps['max']>,
  },
  maxLength: {
    type: Number as PropType<TagsInputProps['maxLength']>,
  },
  modelValue: {
    type: Object as PropType<TagsInputProps['modelValue']>,
  },
  name: {
    type: String as PropType<TagsInputProps['name']>,
  },
  readOnly: {
    type: Boolean as PropType<TagsInputProps['readOnly']>,
  },
  translations: {
    type: Object as PropType<TagsInputProps['translations']>,
  },
  validate: {
    type: Function as PropType<TagsInputProps['validate']>,
  },
  value: {
    type: Object as PropType<TagsInputProps['value']>,
  },
})

export const TagsInput: ComponentWithProps<Partial<TagInputProps>> = defineComponent({
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
