import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { PaginationBasicExample } from './examples/basic'
import { PaginationContextExample } from './examples/context'
import { PaginationControlledExample } from './examples/controlled'
import { PaginationCustomizedExample } from './examples/customized'
import { PaginationDataSlicingExample } from './examples/data-slicing'
import { PaginationLinkExample } from './examples/link'
import { PaginationPageRangeExample } from './examples/page-range'
import { PaginationPageSizeControlExample } from './examples/page-size-control'
import { PaginationRootProviderExample } from './examples/root-provider'
import { PaginationWithEdgesExample } from './examples/with-edges'

const meta: Meta = {
  title: 'Components / Pagination',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [PaginationBasicExample] })],
  render: () => ({ template: '<pagination-basic-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [PaginationContextExample] })],
  render: () => ({ template: '<pagination-context-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [PaginationControlledExample] })],
  render: () => ({ template: '<pagination-controlled-example />' }),
}

export const Customized: StoryObj = {
  decorators: [moduleMetadata({ imports: [PaginationCustomizedExample] })],
  render: () => ({ template: '<pagination-customized-example />' }),
}

export const DataSlicing: StoryObj = {
  decorators: [moduleMetadata({ imports: [PaginationDataSlicingExample] })],
  render: () => ({ template: '<pagination-data-slicing-example />' }),
}

export const Link: StoryObj = {
  decorators: [moduleMetadata({ imports: [PaginationLinkExample] })],
  render: () => ({ template: '<pagination-link-example />' }),
}

export const PageRange: StoryObj = {
  decorators: [moduleMetadata({ imports: [PaginationPageRangeExample] })],
  render: () => ({ template: '<pagination-page-range-example />' }),
}

export const PageSizeControl: StoryObj = {
  decorators: [moduleMetadata({ imports: [PaginationPageSizeControlExample] })],
  render: () => ({ template: '<pagination-page-size-control-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [PaginationRootProviderExample] })],
  render: () => ({ template: '<pagination-root-provider-example />' }),
}

export const WithEdges: StoryObj = {
  decorators: [moduleMetadata({ imports: [PaginationWithEdgesExample] })],
  render: () => ({ template: '<pagination-with-edges-example />' }),
}
