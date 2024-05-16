'use client'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import * as Select from '~/components/ui/select'
import { Icon } from './ui'

export const FrameworkSelect = () => {
  const router = useRouter()
  const params = useParams<{ framework: string }>()
  const pathname = usePathname()
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
  ]

  return (
    <Select.Root
      defaultValue={[params.framework]}
      onValueChange={(e) => router.push(pathname.replace(params.framework, e.value[0]))}
      items={items}
      positioning={{ placement: 'bottom' }}
      variant="ghost"
      size="sm"
    >
      <Select.Control>
        <Select.Trigger
          color="fg.muted"
          fontWeight="medium"
          px="0"
          _hover={{ bg: 'transparent' }}
          gap="1"
        >
          <Select.ValueText placeholder="Select a Framework" />
          <Icon size="sm">
            <ChevronDownIcon />
          </Icon>
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content minW="28">
          {items.map((item) => (
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
