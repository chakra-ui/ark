<script lang="ts">
  import { Timer } from '../index.ts'
</script>

<Timer.Root id="custom" targetMs={60 * 1000}>
  <Timer.Area>
    <Timer.Item type="seconds" />
  </Timer.Area>
</Timer.Root>
