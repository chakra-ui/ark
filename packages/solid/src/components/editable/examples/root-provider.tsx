import { Editable, useEditable } from '@ark-ui/solid/editable'

export const RootProvider = () => {
  const editable = useEditable({ placeholder: 'Placeholder' })

  return (
    <>
      <button onClick={() => editable().edit()}>Edit</button>

      <Editable.RootProvider value={editable}>
        <Editable.Label>Label</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
      </Editable.RootProvider>
    </>
  )
}
