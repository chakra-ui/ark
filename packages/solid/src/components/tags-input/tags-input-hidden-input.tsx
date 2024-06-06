import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputHiddenInputProps extends HTMLArkProps<'input'> {}

export const TagsInputHiddenInput = (props: TagsInputHiddenInputProps) => {
  const tagsInput = useTagsInputContext()
  const mergedProps = mergeProps(() => tagsInput().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}
