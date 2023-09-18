import { Portal, SelectItemIndicator, SelectItemText } from '@ark-ui/react'
import { match } from 'ts-pattern'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
} from '~/components/ui/select'

type Props = {
  framework?: string
}

export const FrameworkSelect = (props: Props) => {
  const { framework } = props

  const defaultValue = match(framework)
    .with('solid', () => ({
      label: 'Solid',
      value: 'solid',
    }))
    .with('vue', () => ({
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
      size={{ base: 'md', md: 'sm' }}
      items={items}
      defaultValue={[defaultValue.value]}
      positioning={{ gutter: 2, sameWidth: true }}
      onValueChange={(e) => {
        window.location.href = window.location.href.replace(defaultValue.value, e.value[0])
      }}
    >
      <SelectLabel textStyle={{ base: 'md', md: 'sm' }} fontWeight="bold">
        Framework
      </SelectLabel>
      <SelectTrigger>Open</SelectTrigger>
      <Portal>
        <SelectPositioner zIndex="popover">
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
