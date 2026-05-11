import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../../src/app";

describe("Health Integration Tests", () => {
  describe("GET /health", () => {
    it("should return 200 OK", async () => {
      const response = await request(app).get("/health");

      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.status, "ok");
    });
  });
});
