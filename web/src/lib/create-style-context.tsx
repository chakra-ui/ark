import { createContext, forwardRef, useContext, type ComponentProps, type ElementType } from 'react'

type Props = Record<string, unknown>
type Recipe = {
  (props?: Props): Record<string, string>
  splitVariantProps: (props: Props) => any
}
type Slot<R extends Recipe> = keyof ReturnType<R>
type SlotRecipe<R extends Recipe> = Record<Slot<R>, string>
type VariantProps<R extends Recipe> = Parameters<R>[0]

export interface StyledContextProvider<T extends ElementType, R extends Recipe> {
  (props: ComponentProps<T> & VariantProps<R>): JSX.Element
}

const cx = (...args: (string | undefined)[]) => args.filter(Boolean).join(' ')

export const createStyleContext = <R extends Recipe>(recipe: R) => {
  const StyleContext = createContext<SlotRecipe<R> | null>(null)

  const withProvider = <T extends ElementType>(Component: T, slot?: Slot<R>) => {
    const Comp = forwardRef((props: ComponentProps<T> & VariantProps<R>, ref) => {
      const [variantProps, localProps] = recipe.splitVariantProps(props)
      const slotRecipe = recipe(variantProps) as SlotRecipe<R>
      return (
        <StyleContext.Provider value={slotRecipe}>
          <Component
            ref={ref}
            {...localProps}
            className={cx(slotRecipe[slot ?? ''], localProps.className)}
          />
        </StyleContext.Provider>
      )
    })
    // @ts-expect-error JSX.IntrinsicElements do not have a displayName but Function and Class components do
    Comp.displayName = Component.displayName || Component.name || 'Component'
    return Comp as unknown as StyledContextProvider<T, R>
  }

  const withContext = <T extends ElementType>(Component: T, slot?: Slot<R>) => {
    const Comp = forwardRef((props: ComponentProps<T>, ref) => {
      const slotRecipe = useContext(StyleContext)
      return (
        // @ts-expect-error
        <Component ref={ref} {...props} className={cx(slotRecipe?.[slot ?? ''], props.className)} />
      )
    })
    // @ts-expect-error JSX.IntrinsicElements do not have a displayName but Function and Class components do
    Comp.displayName = Component.displayName || Component.name || 'Component'

    return Comp as unknown as T
  }

  return {
    withProvider,
    withContext,
  }
}
