<script>
  import { rotation } from "../rotation-store";
  import Player from "./Player.svelte";

  let players;
	let periods;
	let useWristbands;
	let draggedPlayer;

  rotation.subscribe(r => {
    periods = r.periods;
    players = r.players;
    useWristbands = r.useWristbands;
  });

  const onDragStart = (e) => {
    draggedPlayer = e.detail;
  };

  const onDragDrop = (e) => {
    const droppedPlayer = e.detail;
    rotation.pushPlayer(draggedPlayer, droppedPlayer);
  };


  const computePeriods = (players) => {
    if (!players || players.length === 0) {
      return [];
    }

    let playerIndex = 0;
    players.map((player) => player.periods = []);

    for (let period = 0; period < periods; period++) {
      players.map((player) => player.periods[period] = false);

      for (let i = 0; i < 5; i++) {
        players[playerIndex].periods[period] = true;
        playerIndex++;
        if (playerIndex > players.length - 1) {
          playerIndex = 0;
        }
      }

      if (useWristbands) {
        colorCodePlayers(players, period);
      } else {
        players.map((player) => {
          if (player.periods[period]) {
            player.periods[period] = 'gray'
          }
        });
      }
    }

    return players;
  };

  const colorCodePlayers = (players, period) => {
    const playersThisPeriod = players.filter((player) => player.periods[period]);
    const playersLastPeriod = (period === 0) ? [] : players.filter((player) => player.periods[period] && player.periods[period - 1]);
    const newPlayers = playersThisPeriod.filter((player) => playersLastPeriod.indexOf(player) < 0);

    let colors = ['black', 'white', 'red', 'blue', 'yellow'];

    playersLastPeriod.map((player) => {
      const prevColor = player.periods[period - 1];
      colors.splice(colors.indexOf(prevColor), 1);
      player.periods[period] = prevColor;
    });

    newPlayers.map((player) => player.periods[period] = colors.shift());
  };

  $: playerPeriods = computePeriods(players);
</script>

{#if playerPeriods.length > 0}
  <table class="table mb-10">
    <tbody>
    <tr>
      <th></th>
      {#each playerPeriods[0].periods as player, i}
        <th class="text-gray-600">{i+1}</th>
      {/each}
    </tr>
    {#each playerPeriods as player}
      <tr>
        <Player player={player} on:drag-start={onDragStart} on:drag-drop={onDragDrop} />
      </tr>
    {/each}
    </tbody>
  </table>
{/if}
