<svelte:options tag="tracking-input" />

<script lang="ts">
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

  const handleSubmit: svelte.JSX.FormEventHandler<HTMLFormElement> = () =>
    window.open(trackingNumberLink, "_blank", "noreferrer");
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="tracking-numbers"> Tracking Number </label>
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
</form>

<style>
  /* Typography */
  button {
    cursor: pointer;
  }

  input,
  button[type="submit"] {
    font-size: 1.75rem;
    border: none;
    border: 1px solid hsla(0, 0%, 100%, 0.1);
    color: inherit;
    -webkit-appearance: none;
  }

  input {
    /* background: hsla(240, 12%, 29%, 0.5); */
    background: hsla(0, 0%, 100%, 0.1);
    /* border: 1px solid hsla(240, 12%, 29%, 0.5); */
  }

  input::placeholder {
    color: hsla(0, 0%, 100%, 0.2);
  }

  button:disabled {
    opacity: 0.5;
  }

  button[type="submit"] {
    font-family: inherit;
    /* background: hsla(240, 12%, 29%, 1); */
    background: hsla(0, 0%, 100%, 0.2);
  }

  /* Layout */
  label {
    font-size: 1.75rem;
    margin: 0 0.3em;
  }

  input,
  button[type="submit"] {
    padding: 0.5em 1em;
  }

  input {
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
  }

  button[type="submit"] {
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
  }

  @media screen and (max-width: 950px) {
    label {
      display: block;
      text-align: center;
      margin-bottom: 0.3em;
    }
  }

  @media screen and (max-width: 750px) {
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
    }
    label {
      margin: 0 auto;
    }
    input {
      width: 100%;
    }
    input,
    button[type="submit"] {
      border-radius: 100px;
    }
  }
</style>
