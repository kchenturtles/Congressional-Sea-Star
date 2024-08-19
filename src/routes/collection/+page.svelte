<script>
	export let collections;
    console.log
</script>

<main>
    <h1>List of Users</h1>
    <p>Here is a list of users:</p>
    <ul>
        {#each collections as collection}
            <li><a href={`collection/${collection.id}`}>{collection.name}</a></li>
        {/each} 
    </ul>
</main>