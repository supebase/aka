import { createDirectus, rest, readItem, readItems } from "@directus/sdk";

const directus = createDirectus("https://api.aka.vin").with(rest());

export default defineNuxtPlugin(() => {
  return {
    provide: { directus, readItem, readItems },
  };
});
