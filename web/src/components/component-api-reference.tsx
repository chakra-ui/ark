import { Fragment, type ReactNode } from 'react'
import { Divider, HStack, Stack } from 'styled-system/jsx'
import { Heading, Typography } from '~/components/ui/typography'

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
      <Typography color="fg.muted" lineHeight="relaxed">
        {/* TODO update text */}
        API reference docs for the {componentName} component. Learn about the props, CSS, and other
        APIs of this exported module.
      </Typography>
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
                      {/* <Code>{name}</Code> */}
                      <Typography
                        color="fg.muted"
                        textStyle="sm"
                        fontFamily="var(--font-fira-code)"
                      >
                        {property.type}
                      </Typography>
                    </HStack>
                    {property.description && (
                      <Typography color="fg.muted" textStyle="sm">
                        {property.description}
                      </Typography>
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
