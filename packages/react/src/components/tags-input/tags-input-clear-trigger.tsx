'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputClearTriggerBaseProps extends PolymorphicProps {}
export interface TagsInputClearTriggerProps extends HTMLProps<'button'>, TagsInputClearTriggerBaseProps {}

export const TagsInputClearTrigger = ({ ref, ...props }: TagsInputClearTriggerProps) => {
  const tagsInput = useTagsInputContext()
  const mergedProps = mergeProps(tagsInput.getClearTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

TagsInputClearTrigger.displayName = 'TagsInputClearTrigger'
