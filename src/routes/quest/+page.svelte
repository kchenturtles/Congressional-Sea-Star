<script>
	export let quests;
    console.log
</script>

<main>
    <h1>List of Users</h1>
    <p>Here is a list of users:</p>
    <ul>
        {#each quests as quest}
            <li><a href={`quest/${quest.id}`}>{quest.name}</a></li>
        {/each} 
    </ul>
</main>