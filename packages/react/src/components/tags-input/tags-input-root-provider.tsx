import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseTagsInputReturn } from './use-tags-input'
import { TagsInputProvider } from './use-tags-input-context'

interface RootProviderProps {
  value: UseTagsInputReturn
}

export interface TagsInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface TagsInputRootProviderProps
  extends HTMLAttributes<HTMLDivElement>,
    TagsInputRootProviderBaseProps {}

export const TagsInputRootProvider = forwardRef<HTMLDivElement, TagsInputRootProviderProps>(
  (props, ref) => {
    const [{ value: tagsInput }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(tagsInput.getRootProps(), localProps)

    return (
      <TagsInputProvider value={tagsInput}>
        <ark.div {...mergedProps} ref={ref} />
      </TagsInputProvider>
    )
  },
)

TagsInputRootProvider.displayName = 'TagsInputRootProvider'
