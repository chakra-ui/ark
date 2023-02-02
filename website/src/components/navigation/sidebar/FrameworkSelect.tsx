'use client'
import { css } from '@/panda/css'
import { Stack } from '@/panda/jsx'
import { select } from '@/panda/recipes'
import {
  Portal,
  Select,
  SelectContent,
  SelectLabel,
  SelectOption,
  SelectPositioner,
  SelectTrigger,
} from '@ark-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { match, P } from 'ts-pattern'

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
      positioning={{ gutter: 4 }}
      defaultValue={defaultValue}
      onChange={(e) => {
        if (pathName) {
          router.push(pathName.replace(/\/(solid|vue|react)\//, `/${e?.value}/`))
        }
      }}
    >
      {({ selectedOption }) => (
        <Stack flex="1" gap={{ base: '6', lg: '3' }}>
          <SelectLabel
            className={css({
              fontSize: { base: 'md', lg: 'sm' },
              lineHeight: '1.5rem',
              fontWeight: 'semibold',
            })}
          >
            Framework
          </SelectLabel>
          <SelectTrigger>
            <button className={select({ size: 'xs' })}>
              {selectedOption?.label ?? 'Select option'}
            </button>
          </SelectTrigger>
          <Portal>
            <SelectPositioner className={select({ size: 'xs' })}>
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
