<script lang="ts">
    import Field from "$lib/components/Field.svelte";
    import Form from "$lib/components/Form.svelte";
    import Input from "$lib/components/Input.svelte";
    import Button from "$lib/components/Button.svelte";
    import type { QuestTemplate } from "@prisma/client";
 
    let questTemplate: QuestTemplate = {
        name: "",
        description: "",
        open: true,
        ownerId: 0,
        circles: [],
        collections: [],
    };

    function handleSubmit(event: Event) {
        event.preventDefault();
        fetch('/questTemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questTemplate),
        });
    }
</script>
<Form>
    <h1>Quest Template</h1>
    <p>Here you can create a new quest template.</p>
    <Input
        label="Name"
        id="name"
        name="name"
        required
        floating
        bind:value={questTemplate.name}
    />
    <Input
        label="Description"
        id="description"
        name="description"
        required
        floating
        bind:value={questTemplate.description}
    />
    <!-- <Input
        type="checkbox" 
        label="Open"
        id="open"
        name="open"
        required
        floating
        bind:checked={questTemplate.open}
    /> -->
    <Button type="submit" on:click={handleSubmit}>Create</Button>
</Form>