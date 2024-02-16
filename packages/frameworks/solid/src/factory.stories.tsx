import { type ComponentProps, type JSX, type ValidComponent } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'

const meta: Meta = {
  title: 'Facotry',
}

export default meta

// export type DynamicProps<T extends ValidComponent, P = ComponentProps<T>> = {
//   [K in keyof P]: P[K]
//

// type ArkComponent<E extends ElementType, P extends object = object> = {
//     <C extends ValidComponent = E>(props: ArkComponentProps<E, C, P>): JSX.Element
//   }

interface AsChildProp {
  as?: ValidComponent
}

export type PolymorphicProps<T extends ValidComponent, P = ComponentProps<T>> = {
  [K in keyof P]: P[K]
} & AsChildProp

type ElementType = keyof JSX.IntrinsicElements
type JsxElements = {
  [E in ElementType]: (props: PolymorphicProps<E>) => JSX.Element
}

const factory = <E extends ValidComponent>(element: E) => {
  const ArkComponent = (props: PolymorphicProps<E>): JSX.Element => {
    return <Dynamic component={element} {...props} />
  }
  return ArkComponent
}

function jsxFactory() {
  const cache = new Map()

  return new Proxy(factory, {
    apply(_target, _thisArg, argArray) {
      return factory(argArray[0])
    },
    get(_, element) {
      const asElement = element as ValidComponent
      if (!cache.has(asElement)) {
        cache.set(asElement, factory(asElement))
      }
      return cache.get(asElement)
    },
  }) as unknown as JsxElements
}

const ark = jsxFactory()

const Button = factory('button')

export const MyApp = () => {
  return (
    <div>
      <ark.button as="a" type="button">
        Hello
      </ark.button>
      <Button>Hello</Button>
    </div>
  )
}
