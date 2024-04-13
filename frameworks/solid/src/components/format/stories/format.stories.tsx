import type { Meta } from 'storybook-solidjs'
import { Format } from '../'

const meta: Meta = {
  title: 'Components / Format',
}

export default meta

export const Basic = () => {
  return (
    <>
      <p>
        <Format.Byte value={120904} unit="byte" unitDisplay="short" />
      </p>
      <p>
        <Format.Number value={1204} unit="centimeter" />
      </p>
    </>
  )
}
