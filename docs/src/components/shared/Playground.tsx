import React, { ComponentType, Suspense } from 'react'
import { panda } from '../../../panda/jsx'

function lazyNamedImport<
  Module extends { [Key in MemberName]: ComponentType<any> },
  MemberName extends keyof Module,
>(modulePromise: Promise<Module>, memberName: MemberName) {
  return React.lazy(async () => ({ default: (await modulePromise)[memberName] }))
}

const demoComponents = {
  tooltip: lazyNamedImport(import('../demo/Tooltip'), 'DemoTooltip'),
  tab: lazyNamedImport(import('../demo/Tabs'), 'DemoTabs'),
  pagination: lazyNamedImport(import('../demo/Pagination'), 'DemoPagination'),
}

type DemoComponents = typeof demoComponents

type Controls = {
  [PropName: string]:
    | {
        type: 'string'
        label?: React.ReactNode
        defaultValue: string
      }
    | {
        type: 'number'
        label?: React.ReactNode
        defaultValue: number
      }
    | {
        type: 'boolean'
        label?: React.ReactNode
        defaultValue: boolean
      }
    | {
        type: 'select'
        label?: React.ReactNode
        defaultValue: string
        options: string[]
      }
}

type PlaygroundProps = {
  component: keyof DemoComponents
  controls: Controls
}

export const Playground = (props: PlaygroundProps) => {
  const { component, controls } = props
  const [componentProps, setComponentProps] = React.useState(() =>
    Object.fromEntries(
      Object.entries(controls).map(([key, control]) => {
        return [key, control.defaultValue]
      }),
    ),
  )

  const Comp = demoComponents[component]

  return (
    <panda.div
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      borderWidth="1px"
      minHeight="24rem"
      my="16"
    >
      <Canvas>
        <Suspense fallback={null}>
          <Comp {...componentProps} />
        </Suspense>
      </Canvas>
      <ControlsPanel controls={controls} value={componentProps} onChange={setComponentProps} />
    </panda.div>
  )
}

const Canvas = (props: { children?: React.ReactElement }) => (
  <panda.div
    display="flex"
    alignItems="center"
    justifyContent="center"
    py="20"
    bg="bg.dark"
    flex="3"
    bgImage={{
      base: 'radial-gradient(circle,var(--colors-gray-200) 1px, transparent 1px)',
      _dark: 'radial-gradient(circle,var(--colors-gray-800) 1px, transparent 1px)',
    }}
    bgSize="16px 16px"
    {...props}
  />
)

const ControlsPanel = (props: {
  controls: Controls
  value: { [key: string]: any }
  onChange: (value: { [key: string]: any }) => void
}) => {
  const { controls, value, onChange } = props

  return (
    <panda.aside
      display="flex"
      flexDirection="column"
      flex="1"
      bg="bg.dark"
      borderLeft="1px solid"
      borderLeftColor="bg.subtle"
    >
      <panda.header p="5">
        <panda.h3 fontSize="md">Properties</panda.h3>
      </panda.header>
      <panda.div display="flex" flexDirection="column" gap="4" px="5">
        {Object.entries(controls).map(([key, control]) => (
          <Control
            key={key}
            name={key}
            control={control}
            value={value[key]}
            onChange={(fieldValue) => {
              onChange({ ...value, [key]: fieldValue })
            }}
          />
        ))}
      </panda.div>
    </panda.aside>
  )
}

const Control = (props: {
  name: string
  control: Controls[keyof Controls]
  value: any
  onChange: (value: any) => void
}) => {
  const { name, control, value, onChange } = props

  const controlViews = {
    string: () => (
      <panda.input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    ),
    number: () => (
      <panda.input type="number" value={value} onChange={(e) => onChange(e.target.value)} />
    ),
    boolean: () => (
      <panda.input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
    ),
    select: () => {
      if (!('options' in control)) {
        return null
      }

      return (
        <panda.select value={value} onChange={(e) => onChange(e.target.value)}>
          {control.options.map((option) => (
            <panda.option key={option} value={option}>
              {option}
            </panda.option>
          ))}
        </panda.select>
      )
    },
  }

  return (
    <panda.div display="flex" flexDirection="column" gap="2">
      <panda.label htmlFor={name}>{control.label || name}</panda.label>
      {controlViews[control.type]?.()}
    </panda.div>
  )
}
