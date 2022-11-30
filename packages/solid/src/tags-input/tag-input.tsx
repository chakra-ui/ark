import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { TagProps } from './tag'
import { useTagsInputContext } from './tags-input-context'

export type TagInputProps = Assign<HTMLArkProps<'input'>, TagProps>

export const TagInput = (props: TagInputProps) => {
  const [tagInputProps, inputProps] = createSplitProps<TagProps>()(props, [
    'index',
    'disabled',
    'value',
  ])
  const tagsInput = useTagsInputContext()

  return <ark.input {...tagsInput().getTagInputProps(tagInputProps)} {...inputProps} />
}
