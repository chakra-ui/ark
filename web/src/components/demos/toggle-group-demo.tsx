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
import { Toggle, ToggleGroup, type ToggleGroupProps } from '~/components/ui/toggle-group'

export const ToggleGroupDemo = (props: ToggleGroupProps) => {
  return (
    <Stack direction="row" gap="3">
      <ToggleGroup multiple {...props}>
        <Toggle value="bold" aria-label="Toggle Bold">
          <BoldIcon />
        </Toggle>
        <Toggle value="italic" aria-label="Toggle Italic">
          <ItalicIcon />
        </Toggle>
        <Toggle value="underline" aria-label="Toggle Underline">
          <UnderlineIcon />
        </Toggle>
      </ToggleGroup>
      <ToggleGroup defaultValue={['left']} {...props}>
        <Toggle value="left" aria-label="Align Left">
          <AlignLeftIcon />
        </Toggle>
        <Toggle value="center" aria-label="Align Center">
          <AlignRightIcon />
        </Toggle>
        <Toggle value="right" aria-label="Align Right">
          <AlignCenterIcon />
        </Toggle>
        <Toggle value="justify" aria-label="Align Justify">
          <AlignJustifyIcon />
        </Toggle>
      </ToggleGroup>
    </Stack>
  )
}
