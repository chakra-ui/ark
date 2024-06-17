import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputControlBaseProps extends PolymorphicProps<'div'> {}
export interface TagsInputControlProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    TagsInputControlBaseProps {}

export const TagsInputControl = (props: TagsInputControlProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
