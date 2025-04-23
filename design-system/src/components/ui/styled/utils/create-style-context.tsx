import { cx } from '@ark-ui/design-system/css'
import { type StyledComponent, isCssProperty, styled } from '@ark-ui/design-system/jsx'
import {
  type ElementType,
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type RefAttributes,
  createContext,
  forwardRef,
  useContext,
} from 'react'

type Props = Record<string, unknown>
type Recipe = {
  (props?: Props): Props
  splitVariantProps: (props: Props) => [Props, Props]
}
type Slot<R extends Recipe> = keyof ReturnType<R>
type Options = { forwardProps?: string[] }

const shouldForwardProp = (prop: string, variantKeys: string[], options: Options = {}) =>
  options.forwardProps?.includes(prop) || (!variantKeys.includes(prop) && !isCssProperty(prop))

export const createStyleContext = <R extends Recipe>(recipe: R) => {
  const StyleContext = createContext<Record<Slot<R>, string> | null>(null)

  const withRootProvider = <P extends {}>(Component: ElementType) => {
    const StyledComponent = (props: P) => {
      const [variantProps, otherProps] = recipe.splitVariantProps(props)
      const slotStyles = recipe(variantProps) as Record<Slot<R>, string>

      return (
        <StyleContext.Provider value={slotStyles}>
          <Component {...otherProps} />
        </StyleContext.Provider>
      )
    }
    return StyledComponent
  }

  const withProvider = <T, P extends { className?: string | undefined }>(
    Component: ElementType,
    slot: Slot<R>,
    options?: Options,
  ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> => {
    const StyledComponent = styled(
      Component,
      {},
      {
        shouldForwardProp: (prop, variantKeys) => shouldForwardProp(prop, variantKeys, options),
      },
    ) as StyledComponent<ElementType>
    const StyledSlotProvider = forwardRef<T, P>((props, ref) => {
      const [variantProps, otherProps] = recipe.splitVariantProps(props)
      const slotStyles = recipe(variantProps) as Record<Slot<R>, string>

      return (
        <StyleContext.Provider value={slotStyles}>
          <StyledComponent {...otherProps} ref={ref} className={cx(slotStyles?.[slot], props.className)} />
        </StyleContext.Provider>
      )
    })
    // @ts-expect-error
    StyledSlotProvider.displayName = Component.displayName || Component.name

    return StyledSlotProvider
  }

  const withContext = <T, P extends { className?: string | undefined }>(
    Component: ElementType,
    slot: Slot<R>,
  ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> => {
    const StyledComponent = styled(Component)
    const StyledSlotComponent = forwardRef<T, P>((props, ref) => {
      const slotStyles = useContext(StyleContext)
      return <StyledComponent {...props} ref={ref} className={cx(slotStyles?.[slot], props.className)} />
    })
    // @ts-expect-error
    StyledSlotComponent.displayName = Component.displayName || Component.name

    return StyledSlotComponent
  }

  return {
    withRootProvider,
    withProvider,
    withContext,
  }
}
