import { Menu as ArkMenu } from '@ark-ui/react'

interface Item {
  name: string
  uid: string
}

interface Props {
  id: string
  label: string
  items: Item[]
  onSelect?: (uid: string) => void
}

const Menu = (props: Props) => {
  const { id, label, items, onSelect } = props
  return (
    <ArkMenu.Root onSelect={(changes) => onSelect?.(changes.value)} id={id}>
      <ArkMenu.Trigger style={{ fontSize: '18px', padding: '12px' }}>{label} ⬇️</ArkMenu.Trigger>
      <ArkMenu.Positioner>
        <ArkMenu.Content>
          {items.map(({ name, uid }) => {
            return (
              <ArkMenu.Item key={uid} value={uid} className="item">
                <ArkMenu.ItemIndicator>✅</ArkMenu.ItemIndicator>
                {name}
              </ArkMenu.Item>
            )
          })}
        </ArkMenu.Content>
      </ArkMenu.Positioner>
    </ArkMenu.Root>
  )
}

const items = [
  { name: 'one', uid: 'one' },
  { name: 'two', uid: 'two' },
  { name: 'three', uid: 'three' },
]

export const MultipleMenu = () => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Menu id="first" label="First" items={items} />
      <Menu id="second" label="Second" items={items} />
    </div>
  )
}
