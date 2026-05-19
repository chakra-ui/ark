import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { AccordionBasicExample } from './examples/basic'
import { AccordionCollapsibleExample } from './examples/collapsible'
import { AccordionContextExample } from './examples/context'
import { AccordionControlledExample } from './examples/controlled'
import { AccordionDisabledExample } from './examples/disabled'
import { AccordionHorizontalExample } from './examples/horizontal'
import { AccordionItemContextExample } from './examples/item-context'
import { AccordionMultipleExample } from './examples/multiple'
import { AccordionRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Accordion',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [AccordionBasicExample] })],
  render: () => ({ template: '<accordion-basic-example />' }),
}

export const Collapsible: StoryObj = {
  decorators: [moduleMetadata({ imports: [AccordionCollapsibleExample] })],
  render: () => ({ template: '<accordion-collapsible-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [AccordionContextExample] })],
  render: () => ({ template: '<accordion-context-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [AccordionControlledExample] })],
  render: () => ({ template: '<accordion-controlled-example />' }),
}

export const Disabled: StoryObj = {
  decorators: [moduleMetadata({ imports: [AccordionDisabledExample] })],
  render: () => ({ template: '<accordion-disabled-example />' }),
}

export const Horizontal: StoryObj = {
  decorators: [moduleMetadata({ imports: [AccordionHorizontalExample] })],
  render: () => ({ template: '<accordion-horizontal-example />' }),
}

export const ItemContext: StoryObj = {
  decorators: [moduleMetadata({ imports: [AccordionItemContextExample] })],
  render: () => ({ template: '<accordion-item-context-example />' }),
}

export const Multiple: StoryObj = {
  decorators: [moduleMetadata({ imports: [AccordionMultipleExample] })],
  render: () => ({ template: '<accordion-multiple-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [AccordionRootProviderExample] })],
  render: () => ({ template: '<accordion-root-provider-example />' }),
}
