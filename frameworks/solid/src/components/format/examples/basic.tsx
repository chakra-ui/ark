import { Format } from '../..'

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
