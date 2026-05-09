import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Request, Response } from "express";
import { HealthController } from "../src/controllers/health.controller";

describe("HealthController", () => {
  it("should return a status of 'ok'", () => {
    const req: Request = {} as Request;
    let jsonResult: { status: string; uptime: number; timestamp: string } = {
      status: "",
      uptime: 0,
      timestamp: "",
    };

    const res: Response = {
      json: (data: { status: string; uptime: number; timestamp: string }) => {
        jsonResult = data;
        return res;
      },
    } as unknown as Response;

    HealthController.check(req, res);

    assert.strictEqual(jsonResult.status, "ok");
    assert.ok(jsonResult.uptime !== undefined);
    assert.ok(jsonResult.timestamp !== undefined);
  });
});
