<script>
    import { Mode } from "../stores/darkMode";
</script>

<main data-color-scheme="{$Mode}">

    <h1>Main</h1>

    <p>
        Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
    </p>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: 80vh;
    }
</style>