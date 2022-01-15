<svelte:options tag="tracking-input" />

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import RecentList from "./RecentList.svelte";
  import type { Recent } from "./tracking";
  import {
    parseTrackingNumber,
    createFedexTrackingLink,
    createUPSTrackingLink,
    createUSPSTrackingLink,
  } from "./tracking";

  let trackingNumberInput: string;
  let trackingNumberLink: URL;
  let trackingNumberCarrier: string;
  let trackingNumberError = false;
  let recent: Recent[] = [];

  onMount(() => {
    recent = getPersistedRecents();
  });

  onDestroy(() => persistRecents(recent));

  // Determine Tracking page and create link
  $: {
    trackingNumberError = false;
    if (trackingNumberInput) {
      try {
        trackingNumberCarrier = parseTrackingNumber(trackingNumberInput);
        switch (trackingNumberCarrier) {
          case "UPS": {
            trackingNumberLink = createUPSTrackingLink(trackingNumberInput);
            break;
          }
          case "USPS": {
            trackingNumberLink = createUSPSTrackingLink(trackingNumberInput);
            break;
          }
          case "Fedex": {
            trackingNumberLink = createFedexTrackingLink(trackingNumberInput);
            break;
          }
        }
      } catch (err) {
        trackingNumberError = true;
      }
    } else {
      trackingNumberLink = undefined;
      trackingNumberCarrier = undefined;
      trackingNumberError = false;
    }
  }

  function addRecent(newRecent: Recent): void {
    const trackingNumberAlreadyInRecent = recent.some(
      (r) => r.trackingNumberInput === newRecent.trackingNumberInput
    );
    if (trackingNumberAlreadyInRecent) {
      return;
    }
    const updatedRecent = [newRecent, ...recent];
    persistRecents(updatedRecent);
    recent = updatedRecent;
  }

  function getPersistedRecents(): Recent[] {
    const hydratedRecent =
      JSON.parse(localStorage.getItem("recent")) ?? ([] as Recent[]);
    return hydratedRecent;
  }

  function persistRecents(recent: Recent[]) {
    const jsonRecent = JSON.stringify(recent);
    localStorage.setItem("recent", jsonRecent);
  }

  const handleSubmit: svelte.JSX.FormEventHandler<HTMLFormElement> = () => {
    addRecent({
      trackingNumberInput,
      trackingNumberCarrier,
      trackingNumberLink: trackingNumberLink.toString(),
    });
    window.open(trackingNumberLink, "_blank", "noreferrer");
  };

  function handleRemoveRecent(removeLink: string): void {
    recent = recent.filter((r) => r.trackingNumberLink !== removeLink);
    persistRecents(recent);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="tracking-numbers"> Tracking Number </label>
  <div class="multi-element-pill">
    <input
      name="tracking-numbers"
      id="tracking-numbers"
      type="text"
      placeholder="22222222222"
      bind:value={trackingNumberInput}
    />
    {#if trackingNumberError}
      <button type="submit" disabled={trackingNumberError}
        >😫 Unknown Pattern</button
      >
    {:else if !trackingNumberLink}
      <button type="submit" disabled>Enter Tracking Number</button>
    {:else}
      <button type="submit">Track via <b>{trackingNumberCarrier}</b></button>
    {/if}
  </div>
</form>
<RecentList list={recent} onremove={handleRemoveRecent} />

<style>
  /* Typography */
  button {
    cursor: pointer;
  }

  input,
  button[type="submit"] {
    font-size: 1.75rem;
    font-family: inherit;
    border: none;
    border: 1px solid hsla(0, 0%, 100%, 0.1);
    color: inherit;
    -webkit-appearance: none;
  }

  input {
    background: hsla(0, 0%, 100%, 0.1);
  }

  input::placeholder {
    color: hsla(0, 0%, 100%, 0.2);
  }

  button:disabled {
    opacity: 0.5;
  }

  button[type="submit"] {
    font-family: inherit;
    background: hsla(0, 0%, 100%, 0.2);
  }

  /* Layout */
  label {
    display: inline-block;
    font-size: 1.75rem;
    margin: 0.3em 0;
  }

  input,
  button[type="submit"] {
    padding: 0.5em 1em;
  }

  /* Give the elements matching internal straight sides, 
     making one large pill. Stacks into multipls pills
     on small screens */
  .multi-element-pill {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }
  .multi-element-pill :first-child {
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
  }
  .multi-element-pill :last-child {
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
  }
  @media screen and (max-width: 750px) {
    /* Remove the matching straight sides, making both pills */
    .multi-element-pill > * {
      border-radius: 100px;
    }
  }

  @media screen and (max-width: 750px) {
    /* When its on own line,
       make input as wide as container for easier typing */
    input {
      width: 100%;
    }
  }
</style>
