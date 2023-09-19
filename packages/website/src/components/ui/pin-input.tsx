import * as Ark from '@ark-ui/react/pin-input'
import { styled } from 'styled-system/jsx'
import { pinInput, type PinInputVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(pinInput)

export * from '@ark-ui/react/pin-input'
export type PinInputProps = Ark.PinInputProps & PinInputVariantProps

const PinInputRoot = withProvider(styled(Ark.PinInput.Root), 'root')
export const PinInputControl = withContext(styled(Ark.PinInput.Control), 'control')
export const PinInputInput = withContext(styled(Ark.PinInput.Input), 'input')
export const PinInputLabel = withContext(styled(Ark.PinInput.Label), 'label')

export const PinInput = Object.assign(PinInputRoot, {
  Root: PinInputRoot,
  Control: PinInputControl,
  Input: PinInputInput,
  Label: PinInputLabel,
})
