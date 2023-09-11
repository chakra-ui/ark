'use client'
import {
  Portal,
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
} from '@ark-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { P, match } from 'ts-pattern'

type FrameworkSelect = {
  noPortal?: boolean
}
export const FrameworkSelect = (props: FrameworkSelect) => {
  const router = useRouter()
  const pathName = usePathname()

  const defaultValue = match({ pathName })
    .with({ pathName: P.when((pathName) => pathName?.includes('/solid/')) }, () => ({
      label: 'Solid',
      value: 'solid',
    }))
    .with({ pathName: P.when((pathName) => pathName?.includes('/vue/')) }, () => ({
      label: 'Vue',
      value: 'vue',
    }))
    .otherwise(() => ({
      label: 'React',
      value: 'react',
    }))

  const items = [
    {
      label: 'React',
      value: 'react',
    },
    { label: 'Vue', value: 'vue' },
    {
      label: 'Solid',
      value: 'solid',
    },
  ]

  return (
    <Select
      items={items}
      defaultValue={[defaultValue.value]}
      positioning={{ gutter: 2, sameWidth: true }}
      onChange={(e) => {
        window.location.href = window.location.href.replace(defaultValue.value, e.value[0])
      }}
    >
      <SelectLabel>Framework</SelectLabel>
      <SelectTrigger>Open</SelectTrigger>
      <Portal>
        <SelectPositioner>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.value} item={item}>
                <SelectItemText>{item.label}</SelectItemText>
                <SelectItemIndicator>✓</SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectContent>
        </SelectPositioner>
      </Portal>
    </Select>
  )
}
