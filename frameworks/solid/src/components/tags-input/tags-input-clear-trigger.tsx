import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputClearTriggerProps extends HTMLArkProps<'button'> {}

export const TagsInputClearTrigger = (props: TagsInputClearTriggerProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().clearTriggerProps, props)

  return <ark.button {...mergedProps} />
}
