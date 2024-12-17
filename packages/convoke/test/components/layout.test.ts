import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Layout, { type Props } from "../../src/components/layout.astro";

describe("Layout", () => {
  it("renders", async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(Layout, {
      props: {
        title: "Test",
      } satisfies Props,
      slots: {
        default: "test-slot",
      },
    });

    expect(result).toContain("<title>Test</title>");
    expect(result).toContain("test-slot");
  });
});
