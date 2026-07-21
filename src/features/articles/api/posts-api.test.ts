import { describe, expect, it } from "vitest";

import { deletePost, getPosts, getUsername } from "./posts-api";

describe("posts-api (against MSW)", () => {
  it("getPosts returns a validated page + total", async () => {
    const result = await getPosts(1);
    expect(result.posts).toHaveLength(10);
    expect(result.total).toBe(251);
    expect(result.posts[0].id).toBe(1);
  });

  it("getPosts applies the skip for later pages", async () => {
    const result = await getPosts(3);
    // page 3 → skip 20 → first id 21
    expect(result.skip).toBe(20);
    expect(result.posts[0].id).toBe(21);
  });

  it("getUsername resolves the username for a userId", async () => {
    await expect(getUsername(121)).resolves.toBe("author121");
  });

  it("deletePost returns the simulated deletion result", async () => {
    const result = await deletePost(1);
    expect(result).toMatchObject({ id: 1, isDeleted: true });
    expect(result.deletedOn).toBeTruthy();
  });
});
