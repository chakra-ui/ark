import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputInputProps extends HTMLArkProps<'input'> {}

export const TagsInputInput = (props: TagsInputInputProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getInputProps(), props)

  return <ark.input {...mergedProps} />
}
