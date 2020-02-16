<script>
  export let periods;
  export let useWristbands;
  export let onWristbandChange;
</script>

<div class="flex flex-wrap mb-6">
  <div>
    <label class="label" for="grid-first-name">
      Periods
    </label>
    <input class="input" id="grid-first-name" type="text" placeholder="Periods" value="{periods}">
  </div>
  <div>
    <label class="label" for="grid-last-name">
      wristbands
    </label>
    <input class="mr-1 leading-tight" type="checkbox" checked="{useWristbands}" on:change={onWristbandChange}>
    <span class="text-sm">
      Color coded wristbands for man-to-man defense
    </span>
  </div>
</div>
