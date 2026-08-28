'use client'

import type { StageTriggerProps } from '@zag-js/floating-panel'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'

export interface FloatingPanelStageTriggerBaseProps extends PolymorphicProps, StageTriggerProps {}
export interface FloatingPanelStageTriggerProps extends HTMLProps<'button'>, FloatingPanelStageTriggerBaseProps {}

const splitStageTriggerProps = createSplitProps<StageTriggerProps>()

export const FloatingPanelStageTrigger = forwardRef<HTMLButtonElement, FloatingPanelStageTriggerProps>((props, ref) => {
  const [stage, localProps] = splitStageTriggerProps(props, ['stage'])
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getStageTriggerProps(stage), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

FloatingPanelStageTrigger.displayName = 'FloatingPanelStageTrigger'
