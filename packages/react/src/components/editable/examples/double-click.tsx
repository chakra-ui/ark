import { Editable } from '@ark-ui/react/editable'

export const DoubleClick = () => (
  <Editable.Root placeholder="Placeholder" activationMode="dblclick">
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
  </Editable.Root>
)
