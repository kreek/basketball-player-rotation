<script>
  import {beforeUpdate} from 'svelte';
  import AddPlayerForm from "./components/AddPlayerForm.svelte";
  import PlayerList from "./components/PlayerList.svelte";
  import Options from "./components/Options.svelte";

  let periods = 6;
  let useWristbands = false;
  let players;

  const json = localStorage.getItem('players');
  const playersParsed = JSON.parse(json);

  if (playersParsed) {
    players = playersParsed
  } else {
    players = [];
  }

  beforeUpdate(() => {
    console.log('before!');
    localStorage.setItem('players', JSON.stringify(players));
  });

  const uuid = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  };

  const onWristbandChange = () => {
    useWristbands = !useWristbands;
    players = players;
  };

  const addPlayer = (event) => {
    const name = event.target.name.value;
    players = [...players, {id: uuid(), name: name, periods: []}];
  };

  const removePlayer = (player) => {
    players = players.filter(p => p !== player)
  };

  const computePeriods = (players) => {
    if (players.length === 0) {
      return [];
    }

    let playerIndex = 0;

    for (let period = 0; period < periods; period++) {
      players.map((player) => player.periods[period] = false);

      let colors = ['black', 'white', 'red', 'blue', 'yellow'];

      for (let i = 0; i < 5; i++) {
        players[playerIndex].periods[period] = true;
        playerIndex++;
        if (playerIndex > players.length - 1) {
          playerIndex = 0;
        }
      }

      if (useWristbands) {
        colorCodePlayers(players, period, colors);
      } else {
        players.map((player) => { if (player.periods[period]) {player.periods[period] = 'white'}});
      }
    }

    return players;
  };

  const colorCodePlayers = (players, period, colors) => {
    const playersThisPeriod = players.filter((player) => player.periods[period]);
    const playersLastPeriod = (period === 0) ? [] : players.filter((player) => player.periods[period] && player.periods[period - 1]);
    const newPlayers = playersThisPeriod.filter((player) => playersLastPeriod.indexOf(player) < 0);

    playersLastPeriod.map((player) => {
      const prevColor = player.periods[period - 1];
      colors.splice(colors.indexOf(prevColor), 1);
      player.periods[period] = prevColor;
    });

    newPlayers.map((player) => player.periods[period] = colors.shift());
  };

  $: playerPeriods = computePeriods(players);
</script>

<main>
  <h1>Player Rotation</h1>
  <Options {periods} {useWristbands} {onWristbandChange} />
  <PlayerList {playerPeriods} {removePlayer} />
  <AddPlayerForm addPlayer={addPlayer} />
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    @apply bg-gray-900 text-gray-500 m-4;
  }

  h1 {
    @apply font-thin uppercase text-3xl mb-4;
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
    @apply bg-blue-500 border-none text-white font-bold py-1 px-4 rounded;
  }

  .btn:focus {
    @apply outline-none;
  }

  .btn:hover {
    @apply bg-orange-500;
  }

  .btn-secondary {
    @apply bg-gray-800 text-gray-600;
  }

  .btn-secondary:hover {
    @apply text-white;
  }

  .btn-small {
    @apply py-1 px-4;
  }
</style>
