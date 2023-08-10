'use client'
import { createContext, forwardRef, useContext, type ComponentType } from 'react'

type AnyProps = Record<string, unknown>
type AnyRecipe = {
  (props?: AnyProps): Record<string, string>
  splitVariantProps: (props: AnyProps) => any
}

export const createStyleContext = <R extends AnyRecipe>(recipe: R) => {
  const StyleContext = createContext<Record<string, string> | null>(null)

  const withProvider = <T extends {}>(Component: ComponentType<T>, part?: string) => {
    const Comp = forwardRef((props: T & Parameters<R>[0], ref) => {
      const [variantProps, rest] = recipe.splitVariantProps(props)
      const styles = recipe(variantProps)
      return (
        <StyleContext.Provider value={styles}>
          <Component ref={ref} className={styles?.[part ?? '']} {...rest} />
        </StyleContext.Provider>
      )
    })
    Comp.displayName = Component.displayName || Component.name
    return Comp
  }

  const withContext = <T extends {}>(Component: ComponentType<T>, part?: string) => {
    if (!part) return Component

    const Comp = forwardRef((props: T, ref) => {
      const styles = useContext(StyleContext)
      return <Component ref={ref} className={styles?.[part ?? '']} {...props} />
    })
    Comp.displayName = Component.displayName || Component.name
    return Comp
  }

  return {
    withProvider,
    withContext,
  }
}
