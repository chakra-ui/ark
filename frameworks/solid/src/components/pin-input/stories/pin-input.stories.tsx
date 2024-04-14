import { Index } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { PinInput } from '../'
import './pin-input.css'

const meta: Meta = {
  title: 'Components / Pin Input',
}

export default meta

export const Basic = () => (
  <PinInput.Root onValueComplete={(e) => alert(e.valueAsString)}>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <Index each={[0, 1, 2]}>{(id) => <PinInput.Input index={id()} />}</Index>
    </PinInput.Control>
  </PinInput.Root>
)

export const InitialValue = () => (
  <PinInput.Root value={['1', '2', '3']}>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <Index each={[0, 1, 2]}>{(id) => <PinInput.Input index={id()} />}</Index>
    </PinInput.Control>
  </PinInput.Root>
)

export const Customized = () => (
  <PinInput.Root placeholder="*">
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <Index each={[0, 1, 2]}>{(id) => <PinInput.Input index={id()} />}</Index>
    </PinInput.Control>
  </PinInput.Root>
)

export const Blurred = () => (
  <PinInput.Root blurOnComplete>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <Index each={[0, 1, 2]}>{(id) => <PinInput.Input index={id()} />}</Index>
    </PinInput.Control>
  </PinInput.Root>
)

export const OTPMode = () => (
  <PinInput.Root otp>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <Index each={[0, 1, 2]}>{(id) => <PinInput.Input index={id()} />}</Index>
    </PinInput.Control>
  </PinInput.Root>
)

export const WithMask = () => (
  <PinInput.Root mask>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <Index each={[0, 1, 2]}>{(id) => <PinInput.Input index={id()} />}</Index>
    </PinInput.Control>
  </PinInput.Root>
)
