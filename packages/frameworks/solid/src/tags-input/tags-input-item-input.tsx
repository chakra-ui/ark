import { mergeProps } from '@zag-js/solid'
import { useTagsInputItemContext } from '.'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputItemInputProps = HTMLArkProps<'input'>

export const TagsInputItemInput = (props: TagsInputItemInputProps) => {
  const api = useTagsInputContext()
  const itemProps = useTagsInputItemContext()
  const mergedProps = mergeProps(() => api().getItemInputProps(itemProps), props)

  return <ark.input {...mergedProps} />
}
