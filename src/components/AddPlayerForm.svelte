<script>
  import { rotation } from "../rotation-store";

  const addPlayer = (event) => {
    const name = event.target.name.value;
    if (name) {
      rotation.addPlayer(name);
      event.target.name.value = "";
    }
  };

</script>

<form class="form" on:submit|preventDefault="{addPlayer}">
  <div class="flex items-center">
    <p class="control is-expanded">
      <label class="label" for="grid-first-name">
        Add Player
      </label>
      <input required id="name" class="input" type="text" placeholder="Name">
      <span>
        <button class="btn" type="submit">
          Add
        </button>
      </span>
    </p>
  </div>
</form>
