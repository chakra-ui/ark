import { mergeProps } from '@zag-js/solid'
import type { RootState } from '@zag-js/tags-input'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseTagsInputReturn } from './use-tags-input.ts'
import { TagsInputProvider } from './use-tags-input-context.ts'

interface RootProviderProps {
  value: UseTagsInputReturn
}

export interface TagsInputRootProviderState extends RootState {}

export interface TagsInputRootProviderBaseProps extends PolymorphicProps<'div', TagsInputRootProviderState> {}
export interface TagsInputRootProviderProps
  extends HTMLProps<'div'>, RootProviderProps, TagsInputRootProviderBaseProps {}

export const TagsInputRootProvider = (props: TagsInputRootProviderProps) => {
  const [{ value: tagsInput }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => tagsInput().getRootProps(), localProps)

  return (
    <TagsInputProvider value={tagsInput}>
      <ark.div {...mergedProps} state={tagsInput().getRootState()} />
    </TagsInputProvider>
  )
}
