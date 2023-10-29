import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from 'lucide-react'
import { Stack } from 'styled-system/jsx'
import { ToggleGroup, type ToggleGroupProps } from '~/components/ui'

export const Demo = (props: ToggleGroupProps) => {
  return (
    <Stack
      direction={props.orientation === 'horizontal' ? 'row' : 'column'}
      gap="3"
      borderRadius="l3"
      borderWidth={props.variant === 'ghost' ? '1px' : '0'}
      p={props.variant === 'ghost' ? '1' : '0'}
    >
      <ToggleGroup.Root multiple {...props}>
        <ToggleGroup.Item value="bold" aria-label="Toggle Bold">
          <BoldIcon />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="italic" aria-label="Toggle Italic">
          <ItalicIcon />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="underline" aria-label="Toggle Underline">
          <UnderlineIcon />
        </ToggleGroup.Item>
      </ToggleGroup.Root>
      <ToggleGroup.Root defaultValue={['left']} {...props}>
        <ToggleGroup.Item value="left" aria-label="Align Left">
          <AlignLeftIcon />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="center" aria-label="Align Center">
          <AlignCenterIcon />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="right" aria-label="Align Right">
          <AlignRightIcon />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="justify" aria-label="Align Justify">
          <AlignJustifyIcon />
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </Stack>
  )
}
