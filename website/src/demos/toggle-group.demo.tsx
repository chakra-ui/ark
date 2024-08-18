import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react'
import { ToggleGroup } from '~/components/ui/toggle-group'

export const Demo = (props: ToggleGroup.RootProps) => {
  return (
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
  )
}
