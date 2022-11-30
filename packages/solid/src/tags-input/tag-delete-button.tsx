import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { TagProps } from './tag'
import { useTagsInputContext } from './tags-input-context'

export type TagDeleteButtonProps = Assign<HTMLArkProps<'button'>, TagProps>

export const TagDeleteButton = (props: TagDeleteButtonProps) => {
  const [tagProps, buttonProps] = createSplitProps<TagProps>()(props, [
    'index',
    'disabled',
    'value',
  ])
  const tagsInput = useTagsInputContext()

  return <ark.button {...tagsInput().getTagDeleteButtonProps(tagProps)} {...buttonProps} />
}
