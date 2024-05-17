import { ark } from '../../factory'

export const ArkFactory = () => (
  <ark.div
    id="parent"
    class="parent"
    style={{ background: 'red' }}
    asChild={(props) => (
      <ark.span {...props({ id: 'child', class: 'child', style: { color: 'blue' } })} />
    )}
  >
    Ark UI
  </ark.div>
)
