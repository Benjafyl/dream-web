import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

function render(path = "/") {
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders DreamWeb home without starter content", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /DreamWeb Chile/);
  assert.match(html, /Creamos soluciones digitales/);
  assert.match(html, /BKids/);
  assert.match(html, /1Percentil/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|OnPoint/i);
});

test("renders principal Spanish and English routes", async () => {
  const routes = [
    "/servicios",
    "/proyectos",
    "/dreamweb",
    "/contacto",
    "/privacidad",
    "/en",
    "/en/services",
    "/en/projects",
    "/en/about",
    "/en/contact",
  ];

  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
  }
});

test("exposes a minimal health endpoint", async () => {
  const response = await render("/api/health");
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.status, "ok");
  assert.equal(body.service, "dreamweb-web");
});
