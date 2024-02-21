import type { Meta } from '@storybook/react'
import { Collapsible } from '../'
import './collapsible.css'

const meta: Meta = {
  title: 'Components / Collapsible',
}

export default meta

export const Basic = () => (
  <Collapsible.Root>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>
      Macaroon biscuit danish topping danish croissant cheesecake. Bear claw cake biscuit cupcake
      tart dessert. Icing lemon drops chocolate cake carrot cake jelly-o. Halvah sweet jujubes
      caramels lemon drops oat cake dessert gummi bears cake. Tootsie roll marshmallow chocolate
      chupa chups chocolate cake carrot cake oat cake sweet jujubes.
    </Collapsible.Content>
  </Collapsible.Root>
)

export const LazyMount = () => (
  <Collapsible.Root lazyMount>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>
      Macaroon biscuit danish topping danish croissant cheesecake. Bear claw cake biscuit cupcake
      tart dessert. Icing lemon drops chocolate cake carrot cake jelly-o. Halvah sweet jujubes
      caramels lemon drops oat cake dessert gummi bears cake. Tootsie roll marshmallow chocolate
      chupa chups chocolate cake carrot cake oat cake sweet jujubes.
    </Collapsible.Content>
  </Collapsible.Root>
)

export const UnmountOnExit = () => (
  <Collapsible.Root unmountOnExit>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>
      Macaroon biscuit danish topping danish croissant cheesecake. Bear claw cake biscuit cupcake
      tart dessert. Icing lemon drops chocolate cake carrot cake jelly-o. Halvah sweet jujubes
      caramels lemon drops oat cake dessert gummi bears cake. Tootsie roll marshmallow chocolate
      chupa chups chocolate cake carrot cake oat cake sweet jujubes.
    </Collapsible.Content>
  </Collapsible.Root>
)

export const LazyMountAndUnmountOnExit = () => (
  <Collapsible.Root lazyMount unmountOnExit>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>
      Macaroon biscuit danish topping danish croissant cheesecake. Bear claw cake biscuit cupcake
      tart dessert. Icing lemon drops chocolate cake carrot cake jelly-o. Halvah sweet jujubes
      caramels lemon drops oat cake dessert gummi bears cake. Tootsie roll marshmallow chocolate
      chupa chups chocolate cake carrot cake oat cake sweet jujubes.
    </Collapsible.Content>
  </Collapsible.Root>
)
