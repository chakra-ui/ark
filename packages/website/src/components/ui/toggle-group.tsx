import {
  ToggleGroup as ArkToggleGroup,
  type ToggleGroupRootProps,
} from '@ark-ui/react/src/toggle-group'
import { styled } from 'styled-system/jsx'
import { toggleGroup, type ToggleGroupVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(toggleGroup)

export type ToggleGroupProps = ToggleGroupRootProps & ToggleGroupVariantProps

const ToggleGroupRoot = withProvider(styled(ArkToggleGroup.Root), 'root')
export const ToggleGroupItem = withContext(styled(ArkToggleGroup.Item), 'item')

export const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Root: ToggleGroupRoot,
  Item: ToggleGroupItem,
})
