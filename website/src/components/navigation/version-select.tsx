'use client'
import { createListCollection } from '@ark-ui/react/collection'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { Icon } from '~/components/ui/icon'
import { Select } from '~/components/ui/select'

export const VersionSelect = () => {
  const router = useRouter()
  const pathname = usePathname()

  const collection = useMemo(
    () =>
      createListCollection({
        items: [
          { label: 'v5', value: 'v5' },
          { label: 'v4', value: 'v4' },
          { label: 'v3', value: 'v3' },
        ],
      }),
    [],
  )

  const handleValueChange = (value: Select.ValueChangeDetails) => {
    if (value.value.includes('v3')) {
      router.push(`https://v3.ark-ui.com${pathname}`)
    }
    if (value.value.includes('v5')) {
      router.push(`https://ark-ui.com${pathname}`)
    }
  }

  return (
    <Select.Root
      defaultValue={['v4']}
      onValueChange={handleValueChange}
      size={{ base: 'md', md: 'sm' }}
      collection={collection}
      variant="ghost"
      positioning={{ placement: 'bottom-end', sameWidth: true }}
      width="fit-content"
    >
      <Select.Control py={{ base: '1', md: '0' }}>
        <Select.Trigger
          css={{
            color: 'fg.muted',
            fontWeight: 'medium',
            width: 'fit-content',
            _hover: { color: 'fg.default', '& :where(svg)': { color: 'fg.default' } },
            height: '6',
            gap: '0.5',
            px: '2',
          }}
        >
          <Select.ValueText placeholder="Select a Framework" />
          <Icon color="fg.muted" size="sm" mt="0.5">
            <ChevronDownIcon />
          </Icon>
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content minW="24">
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
