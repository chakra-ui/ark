import type { Meta } from '@storybook/react'
import { ByteFormat } from '../byte-format'
import './byte-format.css'

const meta: Meta = {
  title: 'Components / Byte Format',
}

export default meta

export const Basic = () => {
  return (
    <div className="file">
      <span className="file__name">src/index.ts</span>
      <span className="file__size">
        <ByteFormat value={120904} unit="byte" />
      </span>
    </div>
  )
}
