import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export type Carrier = "USPS" | "UPS" | "Fedex";

// Regex from https://stackoverflow.com/a/63115234/9612224
export function parseTrackingNumber(trackingNumberInput: string): Carrier {
  const upsPattern = [
    /^(1Z)[0-9A-Z]{16}$/,
    /^(T)+[0-9A-Z]{10}$/,
    /^[0-9]{9}$/,
    /^[0-9]{26}$/,
  ];

  const uspsPattern = [
    /^(94|93|92|94|95)[0-9]{20}$/,
    /^(94|93|92|94|95)[0-9]{22}$/,
    /^(70|14|23|03)[0-9]{14}$/,
    /^(M0|82)[0-9]{8}$/,
    /^([A-Z]{2})[0-9]{9}([A-Z]{2})$/,
  ];

  const fedexPattern = [
    /^[0-9]{20}$/,
    /^[0-9]{15}$/,
    /^[0-9]{12}$/,
    /^[0-9]{22}$/,
  ];

  const isUPSPattern = upsPattern.some((pattern) =>
    pattern.test(trackingNumberInput)
  );
  if (isUPSPattern) {
    return "UPS";
  }

  const isUSPSPattern = uspsPattern.some((pattern) =>
    pattern.test(trackingNumberInput)
  );
  if (isUSPSPattern) {
    return "USPS";
  }

  const isFedexPattern = fedexPattern.some((pattern) =>
    pattern.test(trackingNumberInput)
  );
  if (isFedexPattern) {
    return "Fedex";
  }

  throw new Error(
    "Cannot parse this tracking number according to any known pattern"
  );
}

export function createUSPSTrackingLink(trackingNumber: string): URL {
  const link = new URL(`https://tools.usps.com/go/TrackConfirmAction`);
  link.searchParams.set("tLabels", trackingNumber);
  return link;
}

export function createUPSTrackingLink(trackingNumber: string): URL {
  const link = new URL(`https://wwwapps.ups.com/WebTracking/processRequest`);
  link.searchParams.set(`tracknum`, trackingNumber);
  return link;
}

export function createFedexTrackingLink(trackingNumber: string): URL {
  const link = new URL(`https://www.fedex.com/fedextrack/`);
  link.searchParams.set("trknbr", trackingNumber);
  return link;
}

export default app;
