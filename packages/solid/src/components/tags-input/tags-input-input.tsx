import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputInputBaseProps extends PolymorphicProps<'input'> {}
export interface TagsInputInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement>,
    TagsInputInputBaseProps {}

export const TagsInputInput = (props: TagsInputInputProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getInputProps(), props)

  return <ark.input {...mergedProps} />
}
