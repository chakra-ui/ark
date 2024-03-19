import type { Meta } from 'storybook-solidjs'
import { NumberFormat } from '../number-format'

const meta: Meta = {
  title: 'Components / Number Format',
}

export default meta

export const Basic = () => {
  return (
    <div>
      <span>
        <NumberFormat value={1204} unit="centimeter" />
      </span>
    </div>
  )
}
