import type { Meta } from 'storybook-solidjs'
import { ByteFormat } from '../byte-format'
import './byte-format.css'

const meta: Meta = {
  title: 'Components / Byte Format',
}

export default meta

export const Basic = () => {
  return (
    <div class="file">
      <span class="file__name">src/index.ts</span>
      <span class="file__size">
        <ByteFormat value={120904} unit="byte" />
      </span>
    </div>
  )
}
