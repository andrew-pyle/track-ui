<svelte:options tag="recent-list" />

<script lang="ts">
  import type { Recent } from "./tracking";
  export let list: Recent[] = [];
</script>

<div class="data">
  <p>History</p>
  <ul>
    {#each list as { trackingNumberCarrier, trackingNumberInput, trackingNumberLink }}
      <a href={trackingNumberLink}>
        <li>
          {trackingNumberInput} from {trackingNumberCarrier}
        </li>
      </a>
    {/each}
  </ul>
</div>

<style>
  .data {
    margin: 2em 0;
    color: hsla(0, 0%, 100%, 0.5);
  }
  p {
    margin: 1em 0;
  }
  a {
    font-family: inherit;
    color: inherit;
  }
  ul {
    margin: 0;
    font-size: 1.75rem;
    border: none;
    color: inherit;
    list-style-type: none;
    padding: 0;
  }
  li {
    background: hsla(0, 0%, 100%, 0.1);
    border: 1px solid hsla(0, 0%, 100%, 0.1);
    padding: 0.4em;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }
  a:first-child li {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  a:last-child li {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
</style>
