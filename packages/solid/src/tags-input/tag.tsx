import { type Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagProps = {
  index: string | number
  value: string
  disabled?: boolean
}

export const Tag = (props: Assign<HTMLArkProps<'div'>, TagProps>) => {
  const [tagProps, divProps] = createSplitProps<TagProps>()(props, ['index', 'disabled', 'value'])
  const tagsInput = useTagsInputContext()

  return <ark.div {...tagsInput().getTagProps(tagProps)} {...divProps} />
}
