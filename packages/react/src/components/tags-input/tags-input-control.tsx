'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputControlBaseProps extends PolymorphicProps {}
export interface TagsInputControlProps extends HTMLProps<'div'>, TagsInputControlBaseProps {}

export const TagsInputControl = ({ ref, ...props }: TagsInputControlProps) => {
  const tagsInput = useTagsInputContext()
  const mergedProps = mergeProps(tagsInput.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

TagsInputControl.displayName = 'TagsInputControl'
