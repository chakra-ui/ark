'use client'
import { Splitter } from '@ark-ui/react/splitter'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { splitter } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(splitter)

export const Root = withProvider(styled(Splitter.Root), 'root')
export const Panel = withContext(styled(Splitter.Panel), 'panel')
export const ResizeTrigger = withContext(styled(Splitter.ResizeTrigger), 'resizeTrigger')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface PanelProps extends ComponentProps<typeof Panel> {}
export interface ResizeTriggerProps extends ComponentProps<typeof ResizeTrigger> {}
