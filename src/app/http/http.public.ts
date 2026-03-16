import { createHttpClient } from "./http.client";

export const publicApi = createHttpClient({
  withAuth: false,
});
