import { ark } from '@ark-ui/react/factory'

export const ArkFactory = () => (
  <ark.div id="parent" className="parent" style={{ background: 'red' }} asChild>
    <ark.span id="child" className="child" style={{ color: 'blue' }}>
      Ark UI
    </ark.span>
  </ark.div>
)
