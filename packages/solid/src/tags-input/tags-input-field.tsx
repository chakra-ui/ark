import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputFieldProps = HTMLArkProps<'input'>

export const TagsInputField = (props: TagsInputFieldProps) => {
  const api = useTagsInputContext()
  const inputProps = mergeProps(() => api().inputProps, props)
  return <ark.input {...inputProps} />
}
