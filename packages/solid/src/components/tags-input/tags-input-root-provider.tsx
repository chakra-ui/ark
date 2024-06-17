import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseTagsInputReturn } from './use-tags-input'
import { TagsInputProvider } from './use-tags-input-context'

interface RootProviderProps {
  value: UseTagsInputReturn
}

export interface TagsInputRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface TagsInputRootProviderProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    RootProviderProps,
    TagsInputRootProviderBaseProps {}

export const TagsInputRootProvider = (props: TagsInputRootProviderProps) => {
  const [{ value: tagsInput }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => tagsInput().getRootProps(), localProps)

  return (
    <TagsInputProvider value={tagsInput}>
      <ark.div {...mergedProps} />
    </TagsInputProvider>
  )
}
