import { ark, HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputControlProps = HTMLArkProps<'div'>

export const TagsInputControl = (props: TagsInputControlProps) => {
  const tagsInput = useTagsInputContext()

  return <ark.div {...tagsInput().controlProps} {...props} />
}
