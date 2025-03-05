const { src, dest, series } = require("gulp")
const htmlmin = require("gulp-htmlmin")
const cleancss = require("gulp-clean-css")
const cssimport = require("gulp-cssimport")
const inlineSource = require("gulp-inline-source")
const replace = require("gulp-replace")
const { rmSync } = require("fs")
const path = require("path")
const rollup = require("rollup")
const nodeResolve = require("@rollup/plugin-node-resolve").default

function cleanDist() {
  rmSync("./dist", { recursive: true, force: true })
  return Promise.resolve()
}

function processCss() {
  return src("src/styles/main.css")
    .pipe(cssimport({ includePaths: ["src/styles"] }))
    .pipe(cleancss({ level: 2 }))
    .pipe(dest("src/intermediate/styles"))
}

async function processJs() {
  const bundle = await rollup.rollup({
    input: "src/scripts/main.js",
    plugins: [nodeResolve()],
  })

  await bundle.write({
    file: "src/intermediate/scripts/bundle.js",
    format: "iife",
    sourcemap: true,
  })
}

function copyHtml() {
  return src("src/index.html").pipe(dest("src/intermediate"))
}

function prepareHtml() {
  return src("src/intermediate/index.html")
    .pipe(replace('href="./styles/main.css"', 'href="styles/main.css" inline'))
    .pipe(
      replace(
        ' <script type="module" src="./scripts/main.js" inline></script>',
        '<script src="/scripts/bundle.js" inline></script>'
      )
    )
    .pipe(dest("src/intermediate"))
}

function copyImages() {
  return src("src/images/**/*").pipe(dest("src/intermediate/images"))
}

function inlineAssets() {
  return src("src/intermediate/index.html")
    .pipe(inlineSource({ rootpath: "src/intermediate", compress: true }))
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest("dist"))
}

async function deleteIntermediate() {
  const intermediatePath = path.join(__dirname, "src", "intermediate")
  await rmSync(intermediatePath, { recursive: true, force: true })
}

exports.default = series(
  cleanDist,
  processCss,
  copyHtml,
  processJs,
  copyImages,
  prepareHtml,
  inlineAssets,
  deleteIntermediate
)
