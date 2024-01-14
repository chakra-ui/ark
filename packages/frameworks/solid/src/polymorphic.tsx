/* eslint-disable @typescript-eslint/no-explicit-any */
/*!
 * Portions of this file are based on code from radix-ui-primitives.
 * MIT Licensed, Copyright (c) 2022 WorkOS.
 *
 * Credits to the Radix UI team:
 * https://github.com/radix-ui/primitives/blob/b14ac1fff0cdaf45d1ea3e65c28c320ac0f743f2/packages/react/slot/src/Slot.tsx
 */

// forked from kobalte

import {
  For,
  Show,
  children,
  splitProps,
  type Accessor,
  type ComponentProps,
  type JSX,
  type ValidComponent,
} from 'solid-js'
import { Dynamic, type DynamicProps } from 'solid-js/web'
import { combineProps as baseCombineProps } from './combine-props'

const isArray = Array.isArray

/* -------------------------------------------------------------------------------------------------
 * Polymorphic
 * -----------------------------------------------------------------------------------------------*/

export interface AsChildProp {
  /** Whether the component should render as its direct `As` child component. */
  asChild?: boolean

  /** The component to render when `children` doesn't contain any `<As>` component as direct child. */
  as?: ValidComponent
}

export type PolymorphicProps<T extends ValidComponent, P = ComponentProps<T>> = {
  [K in keyof P]: P[K]
} & AsChildProp

/**
 * A utility component that render either a direct `<As>` child or its `as` prop.
 */
export function Polymorphic<T extends ValidComponent>(props: PolymorphicProps<T>) {
  const [local, others] = splitProps(props as PolymorphicProps<ValidComponent>, [
    'asChild',
    'as',
    'children',
  ])

  // Prevent the extra computation below when "as child" polymorphism is not needed.
  if (!local.asChild) {
    return (
      <Dynamic component={local.as} {...others}>
        {local.children}
      </Dynamic>
    )
  }

  const resolvedChildren = children(() => local.children) as Accessor<any>

  // Single child is `As`.
  if (isAs(resolvedChildren())) {
    const combinedProps = combineProps(others, resolvedChildren()?.props ?? {})
    return <Dynamic {...combinedProps} />
  }

  // Multiple children, find an `As` if any.
  if (isArray(resolvedChildren())) {
    const newElement = resolvedChildren().find(isAs)

    if (newElement) {
      // because the new element will be the one rendered, we are only interested
      // in grabbing its children (`newElement.props.children`)
      const newChildren = () => (
        <For each={resolvedChildren()}>
          {(child: any) => (
            <Show when={child === newElement} fallback={child}>
              {newElement.props.children}
            </Show>
          )}
        </For>
      )

      const combinedProps = combineProps(others, newElement?.props ?? {})

      return <Dynamic {...combinedProps}>{newChildren}</Dynamic>
    }
  }

  throw new Error(
    '[kobalte]: Component is expected to render `asChild` but no children `As` component was found.',
  )
}

/* -------------------------------------------------------------------------------------------------
 * As
 * -----------------------------------------------------------------------------------------------*/

const AS_COMPONENT_SYMBOL = Symbol('$$KobalteAsComponent')

/**
 * A utility component used to delegate rendering of its `Polymorphic` parent component.
 */
export function As<T extends ValidComponent>(props: DynamicProps<T>) {
  return {
    [AS_COMPONENT_SYMBOL]: true,
    props,
  } as unknown as JSX.Element
}

/* -------------------------------------------------------------------------------------------------
 * Utils
 * -----------------------------------------------------------------------------------------------*/

function isAs(component: any): boolean {
  return component?.[AS_COMPONENT_SYMBOL] === true
}

function combineProps(baseProps: any, overrideProps: any) {
  return baseCombineProps([baseProps, overrideProps], {
    reverseEventHandlers: true,
  }) as any
}
