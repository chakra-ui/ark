import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { CollapsibleBasicExample } from './examples/basic'
import { CollapsibleDisabledExample } from './examples/disabled'
import { CollapsibleInitialOpenExample } from './examples/initial-open'
import { CollapsibleLazyMountExample } from './examples/lazy-mount'
import { CollapsibleNestedExample } from './examples/nested'
import { CollapsiblePartialCollapseExample } from './examples/partial-collapse'
import { CollapsibleRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Collapsible',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollapsibleBasicExample] })],
  render: () => ({ template: '<collapsible-basic-example />' }),
}

export const Disabled: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollapsibleDisabledExample] })],
  render: () => ({ template: '<collapsible-disabled-example />' }),
}

export const InitialOpen: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollapsibleInitialOpenExample] })],
  render: () => ({ template: '<collapsible-initial-open-example />' }),
}

export const LazyMount: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollapsibleLazyMountExample] })],
  render: () => ({ template: '<collapsible-lazy-mount-example />' }),
}

export const Nested: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollapsibleNestedExample] })],
  render: () => ({ template: '<collapsible-nested-example />' }),
}

export const PartialCollapse: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollapsiblePartialCollapseExample] })],
  render: () => ({ template: '<collapsible-partial-collapse-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollapsibleRootProviderExample] })],
  render: () => ({ template: '<collapsible-root-provider-example />' }),
}
