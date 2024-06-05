import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseTagsInputReturn } from './use-tags-input'
import { TagsInputProvider } from './use-tags-input-context'

interface RootProviderProps {
  value: UseTagsInputReturn
}

export interface TagsInputRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const TagsInputRootProvider = forwardRef<HTMLDivElement, TagsInputRootProviderProps>(
  (props, ref) => {
    const [{ value: tagsInput }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(tagsInput.rootProps, localProps)

    return (
      <TagsInputProvider value={tagsInput}>
        <ark.div {...mergedProps} ref={ref} />
      </TagsInputProvider>
    )
  },
)

TagsInputRootProvider.displayName = 'TagsInputRootProvider'
