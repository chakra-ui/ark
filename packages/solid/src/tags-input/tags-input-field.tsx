import { ark, HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputFieldProps = HTMLArkProps<'input'>

export const TagsInputField = (props: TagsInputFieldProps) => {
  const tagsInput = useTagsInputContext()

  return <ark.input {...tagsInput().inputProps} {...props} />
}
