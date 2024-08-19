<script lang="ts">
  import { cn } from '$lib/utils'

  let className = ''
  export { className as class }
</script>

<div
  class={cn(
    'flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4',
    className,
  )}
>
  <slot />
</div>
