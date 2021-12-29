<script lang="ts">
  import {
    parseTrackingNumber,
    createFedexTrackingLink,
    createUPSTrackingLink,
    createUSPSTrackingLink,
  } from "../main";
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
