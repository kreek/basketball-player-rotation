<script>
  import { rotation } from "../rotation-store";

  let useWristbands;
  let periods;

  rotation.subscribe(r => {
    periods = r.periods;
    useWristbands = r.useWristbands;
  });

  const onPeriodChange = (e) => {
    rotation.updatePeriods(e.target.value);
  };

  const onWristbandChange = () => {
    rotation.toggleUseWristbands();
  };

</script>

<div class="flex flex-wrap mb-6">
  <div>
    <label class="label" for="grid-first-name">
      Periods
    </label>
    <input
      on:change={onPeriodChange} min="2" max="16"
      class="input w-20"
      id="grid-first-name"
      type="number"
      placeholder="Periods"
      value="{periods}">
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
