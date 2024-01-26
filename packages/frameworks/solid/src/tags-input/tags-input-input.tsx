import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export interface TagsInputInputProps extends HTMLArkProps<'input'> {}

export const TagsInputInput: ArkComponent<'input'> = (props: TagsInputInputProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().inputProps, props)

  return <ark.input {...mergedProps} />
}
