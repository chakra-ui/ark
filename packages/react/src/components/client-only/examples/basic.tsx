import { ClientOnly } from '@ark-ui/react/client-only'

export const Basic = () => (
  <ClientOnly>
    <div>This content is only rendered on the client side.</div>
  </ClientOnly>
)
