import { ClientOnly } from '../client-only'

export const Basic = () => (
  <ClientOnly>
    <div>This content is only rendered on the client side.</div>
  </ClientOnly>
)
