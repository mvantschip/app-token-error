<script lang="ts">
    import { fly,fade } from "svelte/transition";

    let responseMessage: string;
    let selected;
    let done = false;

    async function submit(e: SubmitEvent) {
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const response = await fetch("/api/form.json", {
        method: "POST",
        body: formData,
        });
        const data = await response.json();
        const status = await response.status;
        responseMessage = data.message;
        
        if (status == 200) {
            done = true;
        }
    }
</script>

{#if !done}
<form on:submit|preventDefault={submit} method="POST" id="form" class="rsvp-form">
	<label for="number">
		Number
    </label>
    <select bind:value={selected} name="number" id="number" required>
        <option value={1}>Alone</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
    </select>
    

    {#each Array(selected) as _, index (index)}
    <label for="name{index+1}">
		Name {index+1}
    </label>
	<input name="name{index+1}" id="name{index+1}" type="text" required>
    {/each}

    <label for="email">
		Email
    </label>
	<input name="email" id="email" type="email" required>


	<button>Submit</button>
</form>
{/if}

{#if responseMessage}
<p
in:fly={{ y: 200, duration: 600 }}
out:fade
>
    { responseMessage } 
</p>
{/if}