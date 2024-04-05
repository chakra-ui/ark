import { useStore } from '@nanostores/react'
import { Stack } from 'styled-system/jsx'
import { ReactIcon, SolidIcon, VueIcon } from '~/components/docs/icons'
import { ToggleGroup } from '~/components/ui'
import { Text } from '~/components/ui/text'
import { selectedFramework, type SelectedFramework } from '~/stores/framework-select.store'

export const FrameworkToggleGroup = (props: ToggleGroup.RootProps) => {
  const $selectedFramework = useStore(selectedFramework)
  return (
    <>
      <Text textStyle={{ base: 'md', md: 'sm' }} fontWeight="semibold">
        Framework
      </Text>
      <Stack
        direction={props.orientation === 'horizontal' ? 'row' : 'column'}
        gap="3"
        borderRadius="l3"
        borderWidth={props.variant === 'ghost' ? '1px' : '0'}
        p={props.variant === 'ghost' ? '1' : '0'}
        w="fit-content"
        overflow="visible"
      >
        <ToggleGroup.Root
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
    </>
  )
}
