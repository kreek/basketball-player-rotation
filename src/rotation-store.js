import {writable} from 'svelte/store';

const localStorageOrInit = () => {
  const json = localStorage.getItem('rotation');
  if (json) {
    return JSON.parse(json);
  } else {
    return {
      periods: 6,
      players: [],
      useWristbands: false
    }
  }
};

const uuid = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
};

const createRotation = () => {
  const {subscribe, update} = writable(localStorageOrInit());

  return {
    subscribe,
    updatePeriods: (newPeriods) => update(r => {
      r.periods = parseInt(newPeriods);
      return r;
    }),
    addPlayer: (name) => update(r => {
      r.players = [...r.players, {id: uuid(), name: name, periods: []}];
      return r;
    }),
    removePlayer: (player) => update(r => {
      r.players = [...r.players].filter(p => p !== player);
      return r;
    }),
    pushPlayer: (pusher, pushee) => update(r => {
      let players = [...r.players];
      const pusheeIndex = players.indexOf(pushee);
      const pusherIndex = players.indexOf(pusher);

      players.splice(pusherIndex, 1);
      players.splice(pusheeIndex, 0, pusher);
      r.players = players;

      return r;
    }),
    toggleUseWristbands: () => update(r => {
      r.useWristbands = !r.useWristbands;
      return r;
    })
  };
};

let r = createRotation();

r.subscribe(rotation => {
  localStorage.setItem('rotation', JSON.stringify(rotation));
});

export const rotation = r;
