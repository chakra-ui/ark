import { useStore } from '@nanostores/react'
import { Stack } from 'styled-system/jsx'
import { Text, ToggleGroup } from '~/components/ui'
import { selectedFramework, type SelectedFramework } from '~/stores/framework-select.store'
import { ReactIcon, SolidIcon, VueIcon } from './icons'

export const FrameworkToggleGroup = (props: ToggleGroup.RootProps) => {
  const $selectedFramework = useStore(selectedFramework)
  return (
    <Stack w="fit-content" gap="2">
      <Text textStyle="sm" fontWeight="semibold">
        Framework
      </Text>
      <ToggleGroup.Root
        size="sm"
        value={[$selectedFramework]}
        onValueChange={(e) => selectedFramework.set(e.value[0] as SelectedFramework)}
        {...props}
      >
        <ToggleGroup.Item value="react" aria-label="Toggle React">
          <ReactIcon />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="solid" aria-label="Toggle Solid">
          <SolidIcon />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="vue" aria-label="Toggle Vue">
          <VueIcon />
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </Stack>
  )
}
