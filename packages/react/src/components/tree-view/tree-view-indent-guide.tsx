'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewIndentGuideBaseProps extends PolymorphicProps {}
export interface TreeViewIndentGuideProps extends HTMLProps<'div'>, TreeViewIndentGuideBaseProps {}

export const TreeViewIndentGuide = forwardRef<HTMLDivElement, TreeViewIndentGuideProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getIndentGuideProps(nodeProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TreeViewIndentGuide.displayName = 'TreeViewIndentGuide'
