import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef as forwardRefReact,
  ForwardRefRenderFunction,
  ValidationMap,
  WeakValidationMap,
} from 'react'

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  as?: ElementType
}

export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends string | number | symbol = never,
> = Omit<Target, 'transition' | 'as' | 'color' | OmitAdditionalProps>

export type Assign<
  SourceProps extends object = Record<string, unknown>,
  OverrideProps extends object = Record<string, unknown>,
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps

export type MergeWithAs<
  ComponentProps extends Record<string, unknown>,
  AsProps extends Record<string, unknown>,
  AdditionalProps extends Record<string, unknown> = Record<string, unknown>,
  AsComponent extends ElementType = ElementType,
> = Assign<ComponentProps, AdditionalProps> &
  Assign<AsProps, AdditionalProps> & {
    as?: AsComponent
  }

export type ComponentWithAs<
  Component extends ElementType,
  Props extends Record<string, unknown> = Record<string, unknown>,
> = {
  <AsComponent extends ElementType = Component>(
    props: MergeWithAs<ComponentProps<Component>, ComponentProps<AsComponent>, Props, AsComponent>,
  ): JSX.Element

  displayName?: string
  propTypes?: WeakValidationMap<unknown>
  contextTypes?: ValidationMap<unknown>
  defaultProps?: Partial<unknown>
  id?: string
}

export function forwardRef<
  Component extends ElementType,
  Props extends Record<string, unknown> = Record<string, unknown>,
>(
  component: ForwardRefRenderFunction<
    unknown,
    Assign<ComponentProps<Component>, Props> & {
      as?: ElementType
    }
  >,
) {
  return forwardRefReact(component) as unknown as ComponentWithAs<Component, Props>
}
