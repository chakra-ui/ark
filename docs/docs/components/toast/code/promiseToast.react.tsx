const toast = useToast()

async function submitForm() {
  // simulate very slow request - wait for 3 seconds
  await new Promise((r) => setTimeout(r, 3000))
}

return (
  <button
    onClick={async () => {
      await toast.promise(submitForm(), {
        error: {
          id: 'error',
          type: 'error',
          title: 'An error occurred. Please try again!',
          placement: 'bottom',
          duration: Infinity,
        },
        loading: {
          id: 'loading',
          type: 'loading',
          title: 'Submitting form. Please wait.',
          placement: 'bottom',
          duration: Infinity,
        },
        success: {
          id: 'success',
          type: 'success',
          title: 'Successfully submitted form.',
          placement: 'bottom',
          duration: 3_000,
        },
      })
    }}
  >
    Show toast
  </button>
)
