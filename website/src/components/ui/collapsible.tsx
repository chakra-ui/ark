import { Collapsible } from '@ark-ui/react/collapsible'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { collapsible } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(collapsible)

export const Root = withProvider(styled(Collapsible.Root), 'root')
export const Content = withContext(styled(Collapsible.Content), 'content')
export const Trigger = withContext(styled(Collapsible.Trigger), 'trigger')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
