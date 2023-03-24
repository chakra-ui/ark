import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputLabelProps = HTMLArkProps<'label'>

export const TagsInputLabel = (props: TagsInputLabelProps) => {
  const tagsInput = useTagsInputContext()

  return <ark.label {...tagsInput().labelProps} {...props} />
}
