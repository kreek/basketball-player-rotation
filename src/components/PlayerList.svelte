<script>
  import Player from "./Player.svelte";
	export let playerPeriods;
	export let removePlayer;
</script>

<table class="table mb-10">
  <tbody>
  <tr>
	  <th></th>
	  {#each playerPeriods[0].periods as player, i}
		  <th class="text-gray-600">{i+1}</th>
	  {/each}
  </tr>
	{#each playerPeriods as player}
    <Player player={player} removePlayer={removePlayer} />
	{/each}
  </tbody>
</table>
