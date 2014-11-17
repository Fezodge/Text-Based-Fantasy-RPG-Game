"use strict";

describe("main.js module", function () {
    it("should load",function () {
        expect(require.bind(null, "../src/main.js")).not.toThrow();
    });
});