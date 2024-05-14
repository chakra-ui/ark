import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemTextProps extends HTMLArkProps<'span'> {}

export const TagsInputItemText = (props: TagsInputItemTextProps) => {
  const api = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
