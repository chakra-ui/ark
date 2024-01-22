import { createSignal, splitProps, type JSX } from 'solid-js'
import { Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import { Popover } from '../'
import './popover.css'

type PopoverType = typeof Popover

const meta: Meta<PopoverType> = {
  title: 'Popover',
  component: Popover,
}

export default meta

interface ButtonVariantProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
}

export interface ButtonProps
  extends ButtonVariantProps,
    JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: ButtonProps) => {
  const [variantProps, buttonProps] = splitProps(props, ['variant'])
  return <button data-variant={variantProps.variant} {...buttonProps} />
}

export const Basic = () => (
  <Popover.Root>
    <Popover.Trigger as={Button}>
      Click Me <Popover.Indicator>{'>'}</Popover.Indicator>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Description</Popover.Description>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)

export const Portalled = () => (
  <Popover.Root portalled>
    <Popover.Trigger>
      Click Me <Popover.Indicator>{'>'}</Popover.Indicator>
    </Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)

export const OnOpenChange = () => {
  return (
    <Popover.Root onOpenChange={(open) => alert(open ? 'opened' : 'closed')}>
      <Popover.Trigger>
        Click Me <Popover.Indicator>{'>'}</Popover.Indicator>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}

export const Controlled = () => {
  const [isOpen, setIsOpen] = createSignal(false)
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen())}>Toggle</button>
      <Popover.Root open={isOpen()}>
        <Popover.Anchor>Anchor</Popover.Anchor>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description</Popover.Description>
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </>
  )
}

export const RenderFn = () => (
  <Popover.Root>
    {(api) => (
      <>
        <Popover.Trigger>Click Me</Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description: {api().isOpen.toString()}</Popover.Description>
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Positioner>
      </>
    )}
  </Popover.Root>
)

export const Arrow = () => (
  <Popover.Root>
    <Popover.Trigger>Click Me</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Arrow>
          <Popover.ArrowTip />
        </Popover.Arrow>
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Description</Popover.Description>
        <Popover.CloseTrigger>Close</Popover.CloseTrigger>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)

export const CloseBehavior = () => (
  <Popover.Root closeOnEsc={false} closeOnInteractOutside={false}>
    <Popover.Trigger>Click Me</Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
          <Popover.CloseTrigger>Close</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)

export const Positioning = () => (
  <Popover.Root
    positioning={{ placement: 'left-start', gutter: 16, offset: { mainAxis: 12, crossAxis: 12 } }}
  >
    <Popover.Trigger>Click Me</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Description</Popover.Description>
        <Popover.CloseTrigger>Close</Popover.CloseTrigger>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)

export const Modal = () => (
  <Popover.Root modal>
    <Popover.Trigger>Click Me</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Description</Popover.Description>
        <Popover.CloseTrigger>Close</Popover.CloseTrigger>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
