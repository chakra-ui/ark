import { ColorPicker } from './'

export const Basic = () => {
  return (
    <ColorPicker>
      {(api) => (
        <>
          <output>
            <div>Color: {api.value}</div>
          </output>
        </>
      )}
    </ColorPicker>
  )
}
