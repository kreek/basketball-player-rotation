<script>
  import AddPlayerForm from "./components/AddPlayerForm.svelte";
  import PlayerList from "./components/PlayerList.svelte";
  import Options from "./components/Options.svelte";
</script>

<main class="m-2 md:m-5">
  <h1 class="font-thin uppercase text-2xl md:text-3xl mt-4 mb-4">Player Rotation</h1>
  <Options />
  <PlayerList />
  <AddPlayerForm />
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    @apply bg-gray-900 text-gray-500;
  }

  .form {
    @apply w-full max-w-sm;
  }

  .label {
    @apply block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2;
  }

  .input {
    @apply text-gray-200 bg-gray-700 py-1 px-4 mr-2 border-none rounded;
  }

  .input:active {
    @apply text-gray-700 bg-gray-500 outline-none border-none;
  }

  .input:focus {
    @apply text-gray-700 bg-gray-500 outline-none;
  }

  .btn {
    @apply bg-blue-500 border-none text-white font-bold rounded;
  }

  .btn:focus {
    @apply outline-none;
  }

  .btn:hover {
    @apply bg-orange-500;
  }

  .btn-primary {
    @apply py-1 px-4
  }

  .btn-secondary {
    @apply bg-gray-800 text-gray-600;
  }

  .btn-secondary:hover {
    @apply text-white;
  }
</style>
