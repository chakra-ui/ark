'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseTagsInputReturn } from './use-tags-input.ts'
import { TagsInputProvider } from './use-tags-input-context.ts'

interface RootProviderProps {
  value: UseTagsInputReturn
}

export interface TagsInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface TagsInputRootProviderProps extends HTMLProps<'div'>, TagsInputRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const TagsInputRootProvider = forwardRef<HTMLDivElement, TagsInputRootProviderProps>((props, ref) => {
  const [{ value: tagsInput }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(tagsInput.getRootProps(), localProps)

  return (
    <TagsInputProvider value={tagsInput}>
      <ark.div {...mergedProps} ref={ref} />
    </TagsInputProvider>
  )
})

TagsInputRootProvider.displayName = 'TagsInputRootProvider'
