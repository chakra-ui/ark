import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputHiddenInputProps = HTMLArkProps<'input'>

export const TagsInputHiddenInput = (props: TagsInputHiddenInputProps) => {
  const api = useTagsInputContext()
  const inputProps = mergeProps(() => api().hiddenInputProps, props)

  return <ark.input {...inputProps} />
}
