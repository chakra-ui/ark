import BasicExample from './examples/basic.vue'
import WithCheckboxExample from './examples/with-checkbox.vue'
import WithFieldExample from './examples/with-field.vue'

export default {
  title: 'Components / Fieldset',
};

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
};

export const WithField = {
  render: () => ({
    components: { WithFieldExample },
    template: '<WithFieldExample />',
  }),
};

export const WithCheckbox = {
  render: () => ({
    components: { WithCheckboxExample },
    template: '<WithCheckboxExample />',
  }),
};