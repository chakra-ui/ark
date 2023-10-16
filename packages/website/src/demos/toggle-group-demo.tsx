import { Stack } from '@ark-ui/styled-system/jsx'
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from 'lucide-react'
import { ToggleGroup, ToggleGroupItem, type ToggleGroupProps } from '~/components/ui/toggle-group'

export const ToggleGroupDemo = (props: ToggleGroupProps) => {
  return (
    <Stack direction="row" gap="3">
      <ToggleGroup multiple {...props}>
        <ToggleGroupItem value="bold" aria-label="Toggle Bold">
          <BoldIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle Italic">
          <ItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle Underline">
          <UnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={['left']} {...props}>
        <ToggleGroupItem value="left" aria-label="Align Left">
          <AlignLeftIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align Center">
          <AlignRightIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align Right">
          <AlignCenterIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Align Justify">
          <AlignJustifyIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </Stack>
  )
}
