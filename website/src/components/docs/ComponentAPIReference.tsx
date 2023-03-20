import { Code } from '@/components/shared/Code'
import { Divider } from '@/components/shared/Divider'
import { Heading } from '@/components/shared/Heading'
import { Text } from '@/components/shared/Text'
import { HStack, Stack } from '@/panda/jsx'
import { Fragment, type ReactNode } from 'react'

type Property = {
  type: string
  isRequired: boolean
  defaultValue?: string
  description?: string
}

type ComponentAPIReferenceProps = {
  componentName: ReactNode
  types: Record<string, Record<string, Property>>
}

export const ComponentAPIReference = (props: ComponentAPIReferenceProps) => {
  const { componentName, types } = props

  return (
    <Stack gap="10" width="full">
      <Text color="fg.muted" lineHeight="relaxed">
        {/* TODO update text */}
        API reference docs for the {componentName} component. Learn about the props, CSS, and other
        APIs of this exported module.
      </Text>
      <Stack gap={{ base: '12', md: '16' }}>
        {Object.entries(types).map(([name, properties]) => (
          <Stack key={name} gap="6" width="full">
            <Heading textStyle="lg" fontWeight="semibold">
              {name}
            </Heading>
            <Stack key={name} gap="6" width="full">
              {Object.entries(properties).map(([name, property], index) => (
                <Fragment key={name}>
                  {index > 0 && <Divider />}
                  <Stack gap="2" key={name} width="full">
                    <HStack justify="space-between" width="full">
                      <Code>{name}</Code>
                      <Text color="fg.muted" textStyle="sm" fontFamily="var(--font-fira-code)">
                        {property.type}
                      </Text>
                    </HStack>
                    {property.description && (
                      <Text color="fg.muted" textStyle="sm">
                        {property.description}
                      </Text>
                    )}
                  </Stack>
                </Fragment>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
