<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseStepsContext } from './use-steps-context.ts'

  export interface StepsContextProps {
    render: Snippet<[UseStepsContext]>
  }
</script>

<script lang="ts">
  import { useStepsContext } from './use-steps-context.ts'

  let { render }: StepsContextProps = $props()

  const stepsContext = useStepsContext()
</script>

{@render render(stepsContext)}
