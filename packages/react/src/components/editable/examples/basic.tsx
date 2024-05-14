import { Editable } from '../..'

export const Basic = () => (
  <Editable.Root placeholder="Placeholder" activationMode="dblclick">
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
  </Editable.Root>
)
