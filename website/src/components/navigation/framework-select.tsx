'use client'
import { createListCollection } from '@ark-ui/react/collection'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { Icon } from '~/components/ui/icon'
import { Select } from '~/components/ui/select'

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
  ],
})

interface Props {
  framework: string
}

export const FrameworkSelect = (props: Props) => {
  const { framework } = props
  return (
    <Select.Root
      defaultValue={[framework]}
      onValueChange={(e) => {
        document.cookie = `framework=${e.value[0]}; path=/; max-age=31536000;`
        window.location.reload()
      }}
      size={{ base: 'md', md: 'sm' }}
      collection={collection}
      variant="ghost"
      positioning={{ placement: 'bottom-end', sameWidth: true }}
    >
      <Select.Control py={{ base: '1', md: '0' }}>
        <Select.Trigger
          css={{
            color: 'fg.muted',
            fontWeight: 'medium',
            _hover: { color: 'fg.default', '& :where(svg)': { color: 'fg.default' } },
          }}
        >
          <Select.ValueText placeholder="Select a Framework" />
          <Icon color="fg.muted" size="sm">
            <ChevronDownIcon />
          </Icon>
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content minW="28">
          {collection.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator>
                <CheckIcon />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}
