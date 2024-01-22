import * as Ark from '@ark-ui/react/src/switch'
import { styled } from 'styled-system/jsx'
import { switchRecipe, type SwitchRecipeVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(switchRecipe)

export * from '@ark-ui/react/src/switch'
export type SwitchProps = Ark.SwitchRootProps & SwitchRecipeVariantProps

const SwitchRoot = withProvider(styled(Ark.Switch.Root), 'root')
export const SwitchControl = withContext(styled(Ark.Switch.Control), 'control')
export const SwitchLabel = withContext(styled(Ark.Switch.Label), 'label')
export const SwitchThumb = withContext(styled(Ark.Switch.Thumb), 'thumb')

export const Switch = Object.assign(SwitchRoot, {
  Root: SwitchRoot,
  Control: SwitchControl,
  Label: SwitchLabel,
  Thumb: SwitchThumb,
})
