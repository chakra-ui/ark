<script lang="ts">
  import { Field } from '../index.ts'

  let { onRef }: { onRef: (node: HTMLTextAreaElement | null) => void } = $props()

  let ref = $state<HTMLElement | null>(null)
  let count = $state(0)

  $effect(() => {
    onRef(ref as HTMLTextAreaElement | null)
  })
</script>

<Field.Root>
  <Field.Label>Notes {count}</Field.Label>
  <Field.Textarea bind:ref placeholder={String(count)} />
  <button type="button" onclick={() => count++}>re-render</button>
</Field.Root>
