const ExampleComponent = () => {
  const toast = useToast()

  return (
    <button
      onClick={() => {
        toast().create({
          type: 'success',
          title: 'Form submitted',
          placement: 'bottom',
        })
      }}
    >
      Show toast
    </button>
  )
}
