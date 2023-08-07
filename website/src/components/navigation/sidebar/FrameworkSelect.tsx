'use client'
import { Button } from '@/components/shared/Button'
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectOption,
  SelectPositioner,
  SelectTrigger,
} from '@/components/ui/select'
import { css } from '@/panda/css'
import { HStack, Stack } from '@/panda/jsx'
import { Portal } from '@ark-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { FiChevronDown } from 'react-icons/fi'
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

  return (
    <Select
      defaultValue={defaultValue}
      positioning={{ gutter: 2, sameWidth: true }}
      onChange={(e) => {
        if (pathName) {
          router.push(pathName.replace(/\/(solid|vue|react)\//, `/${e?.value}/`))
        }
      }}
    >
      {({ selectedOption, isOpen }) => (
        <Stack gap={{ base: '6', lg: '3' }}>
          <SelectLabel
            className={css({
              fontSize: { base: 'md', lg: 'sm' },
              lineHeight: '1.5rem',
              fontWeight: 'semibold',
            })}
          >
            Framework
          </SelectLabel>
          <SelectTrigger asChild>
            <Button variant="secondary" minW="252px">
              <HStack justify="space-between" flex="1" fontWeight="medium">
                {selectedOption?.label ?? 'Select Framework'}
                <SelectIcon isOpen={isOpen} />
              </HStack>
            </Button>
          </SelectTrigger>
          <Portal>
            <SelectPositioner>
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
