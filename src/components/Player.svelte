<script>
  import { rotation } from "../rotation-store";
  import { createEventDispatcher } from'svelte';

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
    class="name border-r">
  {player.name}
</td>
{#each player.periods as period}
  <td class="border-r"><div class="period {period ? "period-" + period : "period-blank"}"></div></td>
{/each}
<td><button class="btn btn-small btn-secondary ml-4" on:click={removePlayer}>x</button></td>

<style>
  .name {
    @apply text-right py-3 px-5
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

  .period {
		@apply h-8 w-8 mx-5 border-2 rounded-full border-gray-600;
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
