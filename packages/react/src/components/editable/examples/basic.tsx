import { Editable } from '@ark-ui/react/editable'

export const Basic = () => (
  <Editable.Root placeholder="Placeholder">
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
  </Editable.Root>
)
