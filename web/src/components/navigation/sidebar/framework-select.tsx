import { Portal } from '@ark-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { FiChevronDown } from 'react-icons/fi'
import { HStack, Stack } from 'styled-system/jsx'
import { P, match } from 'ts-pattern'
import { Button } from '~/components/ui/button'
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectOption,
  SelectPositioner,
  SelectTrigger,
} from '~/components/ui/select'

export const FrameworkSelect = () => {
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

  return (
    <Select
      size={{ base: 'md', md: 'sm' }}
      defaultValue={defaultValue}
      positioning={{ gutter: 2, sameWidth: true }}
      onChange={(e) => {
        if (pathName) {
          router.push(pathName.replace(/\/(solid|vue|react)\//, `/${e?.value}/`))
        }
      }}
    >
      {({ selectedOption, isOpen }) => (
        <Stack gap="3" maxW={{ md: '48' }}>
          <SelectLabel textStyle={{ base: 'md', md: 'sm' }} fontWeight="bold">
            Framework
          </SelectLabel>
          <SelectTrigger asChild>
            <Button variant="secondary" size={{ base: 'md', md: 'sm' }}>
              <HStack justify="space-between" flex="1" fontWeight="medium">
                {selectedOption?.label ?? 'Select Framework'}
                <SelectIcon isOpen={isOpen} />
              </HStack>
            </Button>
          </SelectTrigger>
          <Portal>
            <SelectPositioner zIndex="popover">
              <SelectContent>
                <SelectOption value="react" label="React" />
                <SelectOption value="solid" label="Solid" />
                <SelectOption value="vue" label="Vue" />
              </SelectContent>
            </SelectPositioner>
          </Portal>
        </Stack>
      )}
    </Select>
  )
}

const SelectIcon = (props: { isOpen: boolean }) => {
  const iconStyles = {
    transform: props.isOpen ? 'rotate(-180deg)' : undefined,
    transition: 'transform 0.2s',
    transformOrigin: 'center',
  }
  return <FiChevronDown style={iconStyles} />
}
