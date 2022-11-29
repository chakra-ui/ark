import { ark, HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputClearButtonProps = HTMLArkProps<'button'>

export const TagsInputClearButton = (props: TagsInputClearButtonProps) => {
  const tagsInput = useTagsInputContext()

  return <ark.button {...tagsInput().clearButtonProps} {...props} />
}
