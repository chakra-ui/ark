import * as Ark from '@ark-ui/react/src/toggle-group'
import { styled } from 'styled-system/jsx'
import { toggleGroup, type ToggleGroupVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(toggleGroup)

export * from '@ark-ui/react/src/toggle-group'
export type ToggleGroupProps = Ark.ToggleGroupProps & ToggleGroupVariantProps

const ToggleGroupRoot = withProvider(styled(Ark.ToggleGroup.Root), 'root')
export const ToggleGroupItem = withContext(styled(Ark.ToggleGroup.Item), 'item')

export const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Root: ToggleGroupRoot,
  Item: ToggleGroupItem,
})
