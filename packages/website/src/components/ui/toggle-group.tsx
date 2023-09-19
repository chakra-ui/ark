import * as Ark from '@ark-ui/react/toggle-group'
import { styled } from 'styled-system/jsx'
import { toggleGroup, type ToggleGroupVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(toggleGroup)

export * from '@ark-ui/react/toggle-group'
export type ToggleGroupProps = Ark.ToggleGroupProps & ToggleGroupVariantProps

const ToggleGroupRoot = withProvider(styled(Ark.ToggleGroup.Root), 'root')
export const Toggle = withContext(styled(Ark.ToggleGroup.Toggle), 'toggle')

export const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Root: ToggleGroupRoot,
  Toggle: Toggle,
})
