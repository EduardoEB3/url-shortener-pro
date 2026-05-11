import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../../src/app";
import { redisClient, connectRedis } from "../../src/config/redis";
import { connectMongoDB } from "../../src/config/database";
import mongoose from "mongoose";

describe("URL Integration Tests", () => {
  before(async () => {
    await connectMongoDB();
    await connectRedis();
  });

  after(async () => {
    await mongoose.disconnect();

    if (redisClient.isOpen) {
      await redisClient.quit();
    }
  });

  describe("POST /url/create", () => {
    it("should return 400 for an invalid URL (Testing validation middleware)", async () => {
      const response = await request(app).post("/url/create").send({
        url: "not-a-valid-url",
      });

      assert.strictEqual(response.status, 400);
      assert.ok(response.body.error.includes("Invalid URL"));
    });

    it("should return 201 for a valid URL", async () => {
      const response = await request(app).post("/url/create").send({
        url: "https://www.google.com",
      });

      assert.strictEqual(response.status, 201);
      assert.strictEqual(response.body.originalUrl, "https://www.google.com");
    });

    it("should return 500 for an internal server error", async (t) => {
      const { UrlService } = await import("../../src/services/url.service");
      t.mock.method(UrlService, "createShortUrl", async () => {
        throw new Error("Simulated database error");
      });

      const response = await request(app).post("/url/create").send({
        url: "https://www.google.com",
      });

      assert.strictEqual(response.status, 500);
      assert.strictEqual(response.body.error, "Internal Server Error");
    });
  });

  describe("GET /url/:shortCode", () => {
    it("should return 404 for URL not found", async () => {
      const response = await request(app).get("/url/123");

      assert.strictEqual(response.status, 404);
      assert.strictEqual(response.body.error, "URL not found");
    });

    it("should return redirect", async () => {
      const postResponse = await request(app).post("/url/create").send({
        url: "https://www.google.com",
      });
      const response = await request(app).get(
        `/url/${postResponse.body.shortCode}`,
      );

      assert.strictEqual(response.status, 302);
      assert.strictEqual(response.header.location, "https://www.google.com");
    });
  });
});
