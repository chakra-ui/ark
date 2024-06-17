import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface TagsInputClearTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    TagsInputClearTriggerBaseProps {}

export const TagsInputClearTrigger = (props: TagsInputClearTriggerProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getClearTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
