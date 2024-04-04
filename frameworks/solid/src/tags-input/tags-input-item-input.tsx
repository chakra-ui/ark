import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-context'

export interface TagsInputItemInputProps extends HTMLArkProps<'input'> {}

export const TagsInputItemInput = (props: TagsInputItemInputProps) => {
  const api = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemInputProps(itemProps), props)

  return <ark.input {...mergedProps()} />
}
