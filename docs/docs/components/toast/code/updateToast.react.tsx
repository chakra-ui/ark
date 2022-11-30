const toast = useToast()

async function submitForm() {
  // simulate very slow request - wait for 3 seconds
  await new Promise((r) => setTimeout(r, 3000))
}

return (
  <button
    onClick={async () => {
      toast.create({
        id: 'my-toast',
        title: 'Submitting form',
        placement: 'bottom',
      })
      await submitForm()
      toast.update('my-toast', {
        title: 'Form submitted successfully',
      })
    }}
  >
    Show toast
  </button>
)
