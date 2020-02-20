<script>
  import {rotation} from "../rotation-store";
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  export let player;

  const removePlayer = () => {
    rotation.removePlayer(player);
  };

  const onDragStart = () => {
    dispatch('drag-start', player);
  };

  const onDrop = (e) => {
    dispatch('drag-drop', player);
    e.target.classList.remove('drag-enter');
  };

  const onDragEnter = (e) => {
    e.target.classList.add('drag-enter');
  };

  const onDragLeave = (e) => {
    e.target.classList.remove('drag-enter');
  };

</script>

<td id={player.id}
    draggable="true"
    on:dragstart={onDragStart}
    on:drop={onDrop}
    on:dragenter={onDragEnter}
    on:dragleave={onDragLeave}
    ondragover="return false"
    class="name text-xs md:text-base border-r py-3 px-2 md:px-5">
	{player.name}
</td>
{#each player.periods as period}
  <td class="border-r">
    <div
      class="w-3 h-3 md:w-8 md:h-8 mx-2 border md:border-2 rounded-full border-gray-600 {period ? "period-" + period : "period-blank"}">
    </div></td>
{/each}
<td>
  <button class="btn text-xs py-1 px-2 btn-secondary ml-2 md:ml-4 md:px-3 md:py-1" on:click={removePlayer}>x</button>
</td>

<style>
  .name {
    @apply text-right
  }

  .name:hover {
    cursor: move;
  }

  .drag-enter {
    @apply bg-gray-800;
  }

  .border-r {
    @apply border-r border-r border-gray-800 py-2
  }

  .period-blank {
    @apply border-none;
  }

  .period-black {
    @apply bg-black;
  }

  .period-gray {
    @apply bg-gray-200;
  }

  .period-white {
    @apply bg-white;
  }

  .period-red {
    @apply bg-red-600;
  }

  .period-blue {
    @apply bg-blue-700;
  }

  .period-yellow {
    @apply bg-yellow-400;
  }

  .period-blank {
    color: #d2d2d2;
  }
</style>
