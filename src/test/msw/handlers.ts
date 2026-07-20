import { http, HttpResponse } from "msw";

const BASE = "https://dummyjson.com";

/** Valid demo credentials mirrored from DummyJSON. */
export const VALID_USER = { username: "emilys", password: "emilyspass" };
export const VALID_ACCESS_TOKEN = "valid-access-token";

const userPayload = {
  id: 1,
  username: "emilys",
  email: "emily.johnson@x.dummyjson.com",
  firstName: "Emily",
  lastName: "Johnson",
  gender: "female",
  image: "https://dummyjson.com/icon/emilys/128",
};

export const handlers = [
  http.post(`${BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { username?: string; password?: string };
    if (body.username === VALID_USER.username && body.password === VALID_USER.password) {
      return HttpResponse.json({
        ...userPayload,
        accessToken: VALID_ACCESS_TOKEN,
        refreshToken: "valid-refresh-token",
      });
    }
    return HttpResponse.json({ message: "Invalid credentials" }, { status: 400 });
  }),

  http.get(`${BASE}/auth/me`, ({ request }) => {
    const auth = request.headers.get("Authorization");
    if (auth === `Bearer ${VALID_ACCESS_TOKEN}`) {
      return HttpResponse.json(userPayload);
    }
    return HttpResponse.json({ message: "Invalid/Expired Token!" }, { status: 401 });
  }),

  http.post(`${BASE}/auth/refresh`, async ({ request }) => {
    const body = (await request.json()) as { refreshToken?: string };
    if (body.refreshToken) {
      return HttpResponse.json({
        accessToken: VALID_ACCESS_TOKEN,
        refreshToken: "valid-refresh-token",
      });
    }
    return HttpResponse.json({ message: "Refresh token missing" }, { status: 401 });
  }),

  http.post(`${BASE}/users/add`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: 209, ...body }, { status: 201 });
  }),
];
