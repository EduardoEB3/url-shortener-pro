import { describe, it, mock, afterEach } from "node:test";
import assert from "node:assert/strict";
import { Request, Response } from "express";
import { UrlController } from "../src/controllers/url.controller";
import { UrlService } from "../src/services/url.service";

describe("UrlController", () => {
  const createMockResponse = () => {
    const res: any = {};
    res.status = mock.fn(() => res);
    res.json = mock.fn(() => res);
    res.redirect = mock.fn(() => res);
    return res as Response;
  };

  afterEach(() => {
    mock.restoreAll();
  });

  describe("create", () => {
    it("should return 400 if url is missing in body", async () => {
      const req: Request = { body: {} } as Request;
      const res: Response = createMockResponse();

      await UrlController.create(req, res);

      assert.strictEqual(res.status.mock.calls[0].arguments[0], 400);
      assert.deepStrictEqual(res.json.mock.calls[0].arguments[0], {
        error: "URL is required",
      });
    });

    it("should return 201 and the created short url object", async () => {
      const req: Request = { body: { url: "https://example.com" } } as Request;
      const res: Response = createMockResponse();

      const mockResult = {
        originalUrl: "https://example.com",
        shortCode: "xyz123",
        clicks: 0,
      };
      mock.method(UrlService, "createShortUrl", async () => mockResult);

      await UrlController.create(req, res);

      assert.strictEqual(UrlService.createShortUrl.mock.calls.length, 1);
      assert.strictEqual(
        UrlService.createShortUrl.mock.calls[0].arguments[0],
        "https://example.com",
      );
      assert.strictEqual(res.status.mock.calls[0].arguments[0], 201);
      assert.deepStrictEqual(res.json.mock.calls[0].arguments[0], mockResult);
    });

    it("should return 500 on internal server error", async () => {
      const req: Request = { body: { url: "https://example.com" } } as Request;
      const res: Response = createMockResponse();

      mock.method(UrlService, "createShortUrl", async () => {
        throw new Error("DB Error");
      });

      await UrlController.create(req, res);

      assert.strictEqual(res.status.mock.calls[0].arguments[0], 500);
      assert.deepStrictEqual(res.json.mock.calls[0].arguments[0], {
        error: "Internal Server Error",
      });
    });
  });

  describe("redirect", () => {
    it("should return 400 if shortCode is missing in params", async () => {
      const req: Request = { params: {} } as Request;
      const res: Response = createMockResponse();

      await UrlController.redirect(req, res);

      assert.strictEqual(res.status.mock.calls[0].arguments[0], 400);
      assert.deepStrictEqual(res.json.mock.calls[0].arguments[0], {
        error: "Short code is required",
      });
    });

    it("should redirect to the original url if found", async () => {
      const req: Request = {
        params: { shortCode: "xyz123" },
      } as unknown as Request;
      const res: Response = createMockResponse();

      mock.method(
        UrlService,
        "getOriginalUrl",
        async () => "https://example.com",
      );

      await UrlController.redirect(req, res);

      assert.strictEqual(UrlService.getOriginalUrl.mock.calls.length, 1);
      assert.strictEqual(
        UrlService.getOriginalUrl.mock.calls[0].arguments[0],
        "xyz123",
      );
      assert.strictEqual(
        res.redirect.mock.calls[0].arguments[0],
        "https://example.com",
      );
    });

    it("should return 404 if the url is not found", async () => {
      const req: Request = {
        params: { shortCode: "xyz123" },
      } as unknown as Request;
      const res: Response = createMockResponse();

      mock.method(UrlService, "getOriginalUrl", async () => null);

      await UrlController.redirect(req, res);

      assert.strictEqual(res.status.mock.calls[0].arguments[0], 404);
      assert.deepStrictEqual(res.json.mock.calls[0].arguments[0], {
        error: "URL not found",
      });
    });

    it("should return 500 on internal server error", async () => {
      const req: Request = {
        params: { shortCode: "xyz123" },
      } as unknown as Request;
      const res: Response = createMockResponse();

      mock.method(UrlService, "getOriginalUrl", async () => {
        throw new Error("Redis Error");
      });

      await UrlController.redirect(req, res);

      assert.strictEqual(res.status.mock.calls[0].arguments[0], 500);
      assert.deepStrictEqual(res.json.mock.calls[0].arguments[0], {
        error: "Internal Server Error",
      });
    });
  });
});
