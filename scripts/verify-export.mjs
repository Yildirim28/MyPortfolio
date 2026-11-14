import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const basePath = process.env.EXPECTED_BASE_PATH ?? "";
const outputDirectory = resolve("out");
const requiredFiles = [
  "index.html",
  "CV.pdf",
  "Akash.webp",
  "certificates/STQA_CERTIFICATE.jpeg",
  "manifest.webmanifest"
];

for (const file of requiredFiles) {
  const path = resolve(outputDirectory, file);
  if (!existsSync(path)) throw new Error(`Static export is missing ${file}.`);
}

const html = readFileSync(resolve(outputDirectory, "index.html"), "utf8");
const requiredUrls = [
  `${basePath}/_next/`,
  `${basePath}/Akash.webp`,
  `${basePath}/CV.pdf`,
  `${basePath}/certificates/STQA_CERTIFICATE.jpeg`
];

for (const url of requiredUrls) {
  if (!html.includes(url)) throw new Error(`Static export is missing the expected URL ${url}.`);
}

const manifest = JSON.parse(readFileSync(resolve(outputDirectory, "manifest.webmanifest"), "utf8"));
const expectedStartUrl = `${basePath}/`;

if (manifest.start_url !== expectedStartUrl) {
  throw new Error(`Manifest start_url is ${manifest.start_url}; expected ${expectedStartUrl}.`);
}

console.log(`Static export verified for base path "${basePath || "/"}".`);
