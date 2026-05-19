import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { PaginationBasicExample } from './examples/basic'
import { PaginationControlledExample } from './examples/controlled'
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

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [PaginationControlledExample] })],
  render: () => ({ template: '<pagination-controlled-example />' }),
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
