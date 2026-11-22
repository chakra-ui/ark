import { mount as NormalizeValueExample } from './examples/normalize-value.js'
import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as BlurOnCompleteExample } from './examples/blur-on-complete.js'
import { mount as CustomPlaceholderExample } from './examples/custom-placeholder.js'
import { mount as MaskExample } from './examples/mask.js'
import { mount as OTPModeExample } from './examples/otp-mode.js'
import { mount as VerifyOnCompleteExample } from './examples/verify-on-complete.js'

const meta: Meta = { title: 'Components / Pin Input' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const BlurOnComplete: StoryObj = { name: 'Blur On Complete', render: renderExample(BlurOnCompleteExample) }

export const CustomPlaceholder: StoryObj = {
  name: 'Custom Placeholder',
  render: renderExample(CustomPlaceholderExample),
}

export const Mask: StoryObj = { name: 'Mask', render: renderExample(MaskExample) }

export const OTPMode: StoryObj = { name: 'OTP Mode', render: renderExample(OTPModeExample) }

export const VerifyOnComplete: StoryObj = { name: 'Verify On Complete', render: renderExample(VerifyOnCompleteExample) }

export const NormalizeValue: StoryObj = { name: 'Normalize Value', render: renderExample(NormalizeValueExample) }
