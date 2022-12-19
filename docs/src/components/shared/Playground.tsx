import React, { ComponentType, Suspense, useId } from 'react'
import { panda } from '../../../panda/jsx'
import { Input } from './Input'

function lazyNamedImport<
  Module extends { [Key in MemberName]: ComponentType<any> },
  MemberName extends keyof Module,
>(modulePromise: Promise<Module>, memberName: MemberName) {
  return React.lazy(async () => ({ default: (await modulePromise)[memberName] }))
}

const presets = {
  pagination: {
    component: lazyNamedImport(import('../demo/Pagination'), 'DemoPagination'),
    controls: {},
  },
  'pin-input': {
    component: lazyNamedImport(import('../demo/PinInput'), 'DemoPinInput'),
    controls: {},
  },
  popover: {
    component: lazyNamedImport(import('../demo/Popover'), 'DemoPopover'),
    controls: {},
  },
  'range-slider': {
    component: lazyNamedImport(import('../demo/RangeSlider'), 'DemoRangeSlider'),
    controls: {},
  },
  slider: {
    component: lazyNamedImport(import('../demo/Slider'), 'DemoSlider'),
    controls: {},
  },
  tabs: {
    component: lazyNamedImport(import('../demo/Tabs'), 'DemoTabs'),
    controls: {},
  },
  tooltip: {
    component: lazyNamedImport(import('../demo/Tooltip'), 'DemoTooltip'),
    controls: {
      openDelay: { type: 'number', label: 'Open delay', defaultValue: 500 },
      closeDelay: { type: 'number', label: 'Close delay', defaultValue: 200 },
    },
  },
} satisfies Record<string, { component: React.ElementType; controls?: Controls }>

type Presets = typeof presets

type Controls = Record<
  string,
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
>

type PlaygroundProps = {
  preset: keyof Presets
  controls?: Controls
}

export const Playground = (props: PlaygroundProps) => {
  const { preset, controls: propControls } = props
  console.log(props)
  const { controls: presetControls, component: Comp } = presets[preset]
  const controls = propControls ?? presetControls ?? {}

  const [componentProps, setComponentProps] = React.useState(() =>
    Object.fromEntries(
      Object.entries(controls).map(([key, control]) => [key, control.defaultValue]),
    ),
  )

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
    flexGrow="3"
    flexShrink="1"
    flexBasis="60"
    p="4"
    bgImage={{
      base: 'radial-gradient(circle,var(--colors-gray-200) 1px, transparent 1px)',
      _dark: 'radial-gradient(circle,var(--colors-gray-800) 1px, transparent 1px)',
    }}
    bgSize="16px 16px"
    {...props}
  />
)

const ControlsPanel = (props: {
  controls?: Controls
  value: { [key: string]: any }
  onChange: (value: { [key: string]: any }) => void
}) => {
  const { controls, value, onChange } = props

  if (!controls || !Object.keys(controls).length) {
    return null
  }

  return (
    <panda.aside
      display="flex"
      flexDirection="column"
      flexGrow="0"
      flexShrink="1"
      flexBasis="60"
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
  const id = `${useId()}${name}`

  const controlViews = {
    string: () => (
      <Input
        type="text"
        name={name}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="sm"
        flexGrow="1"
        flexShrink="0"
        flexBasis="20"
      />
    ),
    number: () => (
      <Input
        type="number"
        name={name}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="sm"
        flexGrow="1"
        flexShrink="0"
        flexBasis="20"
      />
    ),
    boolean: () => (
      <Input
        type="checkbox"
        name={name}
        id={id}
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        flexGrow="0"
        flexShrink="0"
        flexBasis="min-content"
        appearance="auto"
      />
    ),
    select: () => {
      if (!('options' in control)) {
        return null
      }

      return (
        <panda.select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          flexGrow="1"
          flexShrink="0"
          flexBasis="20"
        >
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
    <panda.div display="flex" gap="2" justifyContent="space-between" alignItems="baseline">
      <panda.label
        htmlFor={id}
        textStyle="sm"
        color="fg.muted"
        flexGrow="1"
        _after={{ content: '":"' }}
      >
        {control.label || name}
      </panda.label>
      {controlViews[control.type]?.()}
    </panda.div>
  )
}
