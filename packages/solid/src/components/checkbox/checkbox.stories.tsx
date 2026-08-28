import type { Meta } from 'storybook-solidjs-vite'

const meta: Meta = {
  title: 'Components / Checkbox',
}

export default meta

export { Basic } from './examples/basic.tsx'
export { Controlled } from './examples/controlled.tsx'
export { DefaultChecked } from './examples/default-checked.tsx'
export { Disabled } from './examples/disabled.tsx'
export { Group } from './examples/group.tsx'
export { GroupControlled } from './examples/group-controlled.tsx'
export { GroupProvider } from './examples/group-provider.tsx'
export { GroupWithForm } from './examples/group-with-form.tsx'
export { GroupWithInvalid } from './examples/group-with-invalid.tsx'
export { GroupWithMaxSelected } from './examples/group-with-max-selected.tsx'
export { GroupWithSelectAll } from './examples/group-with-select-all.tsx'
export { Indeterminate } from './examples/indeterminate.tsx'
export { Context } from './examples/context.tsx'
export { RootProvider } from './examples/root-provider.tsx'
export { WithField } from './examples/with-field.tsx'
export { GroupWithFieldset } from './examples/group-with-fieldset.tsx'
export { WithForm } from './examples/with-form.tsx'
