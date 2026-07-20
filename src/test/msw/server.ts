import { setupServer } from "msw/node";

import { handlers } from "./handlers";

/** Node MSW server for tests. Started/stopped in vitest.setup.ts. */
export const server = setupServer(...handlers);
