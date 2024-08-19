<script lang="ts">
    import { navigating } from "$app/stores";
    import Footer from "$lib/components/Footer.svelte";
    import { onMount } from "svelte";
    import Alert from '$lib/components/Alert.svelte';
    import progress from "$lib/client/progress";
    import '$lib/app.css';
    import Nav from "$lib/components/Nav.svelte";
    
</script>
<div class="container mx-auto">
<Nav />
<div class="grow">
  <main class="mt-20 px-d py-8">
    <h1>One Project in a Sea of Stars</h1>
<div class="flex min-h-screen flex-col">
    <div class="flex grow flex-col">
      <slot />
    </div>
    <Footer />
  </div>
  <Alert />
</main>
</div>
</div>
<slot></slot>