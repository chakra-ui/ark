import {
  Editable,
  EditableArea,
  EditableInput,
  EditableInputProps,
  EditablePreview,
  EditableProps,
} from '@ark-ui/react'
import React, { ComponentType, Suspense, useId } from 'react'
import { css } from '../../../panda/css'
import { panda, Stack } from '../../../panda/jsx'

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
      placement: {
        type: 'select',
        label: 'Placement',
        defaultValue: 'top',
        options: [
          'top',
          'right',
          'bottom',
          'left',
          'top-start',
          'top-end',
          'right-start',
          'right-end',
          'bottom-start',
          'bottom-end',
          'left-start',
          'left-end',
        ],
      },
      'data-demo-boolean': { type: 'boolean', label: 'Boolean Demo Prop', defaultValue: false },
      'data-demo-string': {
        type: 'string',
        label: 'String Demo Prop',
        defaultValue: 'default value',
      },
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
    flexShrink="0"
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
    <Stack
      as="aside"
      gap="6"
      borderLeftWidth="1px"
      p="4"
      flexBasis="64"
      flexGrow="0"
      flexShrink="0"
      alignItems="stretch"
    >
      <Stack as="header" gap="1">
        <panda.h3 textStyle="sm" fontWeight="medium">
          Properties
        </panda.h3>
      </Stack>
      <Stack gap="4" alignItems="stretch">
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
      </Stack>
    </Stack>
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
      <EditableControl
        type="text"
        name={name}
        id={id}
        value={value}
        onChange={(e) => onChange(e.value)}
      />
    ),
    number: () => (
      <EditableControl
        type="number"
        name={name}
        id={id}
        value={value}
        onChange={(e) => onChange(e.value)}
      />
    ),
    boolean: () => (
      <panda.input
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
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          css={{
            flexGrow: '1',
            w: 'full',
            background: 'transparent',
            borderRadius: 'xs',
            _focus: {
              zIndex: 1,
              '--shadow': {
                base: 'colors.purple.500',
                _dark: 'colors.purple.200',
              },
              boxShadow: '0 0 0 1px var(--shadow)',
              borderColor: 'accent.default',
              outline: 'none',
            },
            appearance: 'none',
            maxW: '24',
            textStyle: 'sm',
            fontWeight: 'medium',
            color: 'fg.emphasized',
            whiteSpace: 'nowrap',
            textAlign: 'right',
          }}
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
        whiteSpace="nowrap"
        flexGrow="1"
        _after={{ content: '":"' }}
      >
        {control.label || name}
      </panda.label>
      {controlViews[control.type]?.()}
    </panda.div>
  )
}

type EditableControlProps = Omit<EditableProps, 'children'> & { type?: EditableInputProps['type'] }
const EditableControl = (props: EditableControlProps) => {
  const { type, ...editableProps } = props
  return (
    <Editable
      {...editableProps}
      className={css({
        flex: '1',
        minH: '6',
      })}
    >
      <EditableArea
        className={css({
          display: 'inline-flex',
          justifyContent: 'flex-end',
          w: 'full',
        })}
      >
        <EditableInput
          type={type}
          className={css({
            flex: '1',
            maxW: 'full',
            w: 'full',
            textStyle: 'sm',
            fontWeight: 'medium',
            textAlign: 'right',

            background: 'transparent',
            borderRadius: 'xs',
            _focus: {
              zIndex: 1,
              '--shadow': {
                base: 'colors.purple.500',
                _dark: 'colors.purple.200',
              },
              boxShadow: '0 0 0 1px var(--shadow)',
              borderColor: 'accent.default',
              outline: 'none',
            },
            appearance: 'none',
            color: 'fg.emphasized',
            whiteSpace: 'nowrap',
          })}
        />
        <EditablePreview
          className={css({
            flex: '1',
            minH: '4',
            textStyle: 'sm',
            fontWeight: 'medium',
            color: 'fg.emphasized',
            textAlign: 'right',
            wordBreak: 'break-word',
          })}
        />
      </EditableArea>
    </Editable>
  )
}
