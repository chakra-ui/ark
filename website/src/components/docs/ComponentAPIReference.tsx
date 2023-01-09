import { Heading } from '@/components/shared/Heading'
import { Text } from '@/components/shared/Text'
import { css } from '@/panda/css'
import { panda, Stack } from '@/panda/jsx'
import type { ReactNode } from 'react'
import { Badge } from '../shared/Badge'

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
      <Stack gap="4">
        <Heading textStyle="2xl" fontWeight="semibold">
          Properties
        </Heading>
        {/*@ts-ignore wrong typings*/}
        <Text color="fg.muted" lineHeight="relaxed">
          {/* TODO update text */}
          API reference docs for the {componentName} component. Learn about the props, CSS, and
          other APIs of this exported module.
        </Text>
      </Stack>
      <Stack gap="10">
        {Object.entries(types).map(([name, properties]) => (
          <Stack key={name} gap="6" width="full">
            <Heading textStyle="lg" fontWeight="semibold">
              {name}
            </Heading>
            <Properties properties={properties} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

type PropertiesProps = {
  properties: Record<string, Property>
}

const Properties = (props: PropertiesProps) => {
  const { properties } = props

  return (
    <table>
      <thead>
        <tr>
          {['Property', 'Description'].map((title) => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(properties).map(([name, property]) => (
          <tr key={name}>
            <td>
              <Stack gap="1" direction="row">
                <panda.span>{name}</panda.span>
                {property.isRequired && <Badge>required</Badge>}
              </Stack>
            </td>
            <td>
              <Stack gap="0.5">
                <code
                  className={css({
                    display: 'block',
                    fontSize: '13px',
                    whiteSpace: 'break-spaces',
                    color: 'accent.default',
                    fontFamily: 'var(--font-roboto-mono)',
                    textStyle: 'sm',
                    wordBreak: 'break-all',
                  })}
                >
                  {property.type}
                </code>
                <Text textStyle="sm" color="fg.muted" lineHeight="relaxed">
                  {property.description}
                </Text>
              </Stack>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
