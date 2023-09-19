import * as Ark from '@ark-ui/react/number-input'
import { styled } from 'styled-system/jsx'
import { numberInput, type NumberInputVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(numberInput)

export * from '@ark-ui/react/number-input'
export type NumberInputProps = Ark.NumberInputProps & NumberInputVariantProps

const NumberInputRoot = withProvider(styled(Ark.NumberInput.Root), 'root')
export const NumberInputControl = withContext(styled(Ark.NumberInput.Control), 'control')
export const NumberInputDecrementTrigger = withContext(
  styled(Ark.NumberInput.DecrementTrigger),
  'decrementTrigger',
)
export const NumberInputInput = withContext(styled(Ark.NumberInput.Input), 'input')
export const NumberInputIncrementTrigger = withContext(
  styled(Ark.NumberInput.IncrementTrigger),
  'incrementTrigger',
)
export const NumberInputLabel = withContext(styled(Ark.NumberInput.Label), 'label')
export const NumberInputScrubber = withContext(styled(Ark.NumberInput.Scrubber), 'scrubber')

export const NumberInput = Object.assign(NumberInputRoot, {
  Root: NumberInputRoot,
  Control: NumberInputControl,
  DecrementTrigger: NumberInputDecrementTrigger,
  Input: NumberInputInput,
  IncrementTrigger: NumberInputIncrementTrigger,
  Label: NumberInputLabel,
  Scrubber: NumberInputScrubber,
})
