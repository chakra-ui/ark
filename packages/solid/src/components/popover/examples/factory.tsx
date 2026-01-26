import { ark } from '@ark-ui/solid/factory'

export const Factory = () => (
  <ark.span
    asChild={(props) => (
      <a href="#" {...props()}>
        Ark UI
      </a>
    )}
  />
)
