<script>
    import "../app.css"
    import "../fonts/inter/inter.css"

    import { Mode } from "../stores/darkMode";

    import Header from "../components/Header.svelte"
</script>

<div class="grid grid-wrapper">
    <Header/>
    <main data-color-scheme="{$Mode}" class="flex jcc aic">
        <slot />
    </main>
</div>

<style>
    div.grid-wrapper {
        height: 100dvh;
        width: 100vw;
        overflow: hidden;

        grid-template-rows: min-content auto;
    } 
</style>