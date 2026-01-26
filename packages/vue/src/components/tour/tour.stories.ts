import type { Meta } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components / Tour',
}

export default meta

export { default as Basic } from './examples/basic.vue'
export { default as AsyncStep } from './examples/async-step.vue'
export { default as Events } from './examples/events.vue'
export { default as KeyboardNavigation } from './examples/keyboard-navigation.vue'
export { default as MixedTypes } from './examples/mixed-types.vue'
export { default as SkipTour } from './examples/skip-tour.vue'
export { default as WaitForClick } from './examples/wait-for-click.vue'
export { default as WaitForElement } from './examples/wait-for-element.vue'
export { default as WaitForInput } from './examples/wait-for-input.vue'
export { default as ProgressBar } from './examples/progress-bar.vue'
