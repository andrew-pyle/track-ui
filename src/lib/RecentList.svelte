<svelte:options tag="recent-list" />

<script lang="ts">
  import type { Recent } from "./tracking";
  export let list: Recent[] = [];
  export let onremove: (link: string) => void;
</script>

<div class="data">
  <p>History</p>
  <ul>
    {#each list as { trackingNumberCarrier, trackingNumberInput, trackingNumberLink }}
      <li>
        <a href={trackingNumberLink}>
          {trackingNumberInput} from {trackingNumberCarrier}
        </a>
        <button on:click={() => onremove(trackingNumberLink)}>&times;</button>
      </li>
    {:else}
      <li>No History yet.</li>
    {/each}
  </ul>
</div>

<style>
  .data {
    font-size: 1.75rem;
    margin: 2em 0;
    color: hsla(0, 0%, 100%, 0.5);
  }
  p {
    margin: 1em 0;
  }
  button {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-size: inherit;
    color: inherit;
  }
  a {
    font-family: inherit;
    color: inherit;
    display: block;
    width: 100%;
  }
  ul {
    margin: 0;
    border: none;
    color: inherit;
    list-style-type: none;
    padding: 0;
  }
  li {
    display: flex;
    justify-content: center;
    background: hsla(0, 0%, 100%, 0.1);
    border: 1px solid hsla(0, 0%, 100%, 0.1);
    padding: 0.4em;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }
  li:first-of-type {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  li:last-of-type {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
</style>
