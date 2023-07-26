import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { type TagProps } from './tag'
import { useTagsInputContext } from './tags-input-context'

export type TagInputProps = Assign<HTMLArkProps<'input'>, TagProps>

export const TagInput = (props: TagInputProps) => {
  const [tagParams, restProps] = createSplitProps<TagProps>()(props, ['index', 'disabled', 'value'])

  const api = useTagsInputContext()
  const inputProps = mergeProps(() => api().getTagInputProps(tagParams), restProps)

  return <ark.input {...inputProps} />
}
