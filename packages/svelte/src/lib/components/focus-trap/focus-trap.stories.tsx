import type { Meta } from '@storybook/react'
import AutofocusExample from './examples/autofocus.svelte'
import BasicExample from './examples/basic.svelte'
import InitialFocusExample from './examples/initial-focus.svelte'

const meta: Meta = {
  title: 'Components / Focus Trap',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const InitialFocus = {
  render: () => ({
    Component: InitialFocusExample,
  }),
}

export const Autofocus = {
  render: () => ({
    Component: AutofocusExample,
  }),
}
