import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { RatingGroupBasicExample } from './examples/basic'
import { RatingGroupControlledExample } from './examples/controlled'
import { RatingGroupDisabledExample } from './examples/disabled'
import { RatingGroupFormUsageExample } from './examples/form-usage'
import { RatingGroupHalfStarExample } from './examples/half-star'
import { RatingGroupRootProviderExample } from './examples/root-provider'
import { RatingGroupWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Rating Group',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [RatingGroupBasicExample] })],
  render: () => ({ template: '<rating-group-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [RatingGroupControlledExample] })],
  render: () => ({ template: '<rating-group-controlled-example />' }),
}

export const Disabled: StoryObj = {
  decorators: [moduleMetadata({ imports: [RatingGroupDisabledExample] })],
  render: () => ({ template: '<rating-group-disabled-example />' }),
}

export const FormUsage: StoryObj = {
  decorators: [moduleMetadata({ imports: [RatingGroupFormUsageExample] })],
  render: () => ({ template: '<rating-group-form-usage-example />' }),
}

export const HalfStar: StoryObj = {
  decorators: [moduleMetadata({ imports: [RatingGroupHalfStarExample] })],
  render: () => ({ template: '<rating-group-half-star-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [RatingGroupRootProviderExample] })],
  render: () => ({ template: '<rating-group-root-provider-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [RatingGroupWithFieldExample] })],
  render: () => ({ template: '<rating-group-with-field-example />' }),
}
