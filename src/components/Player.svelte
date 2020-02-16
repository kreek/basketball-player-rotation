<script>
	export let player;
	export let removePlayer;
</script>

<tr>
  <td class="name border-r">{player.name}</td>
  {#each player.periods as period}
    <td class="border-r"><div class="period {period ? "period-" + period : "period-blank"}"></div></td>
  {/each}
  <td><button class="btn btn-small btn-secondary ml-4" on:click={removePlayer(player)}>x</button></td>
</tr>

<style>
  .name {
    @apply text-right py-3 px-5
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
