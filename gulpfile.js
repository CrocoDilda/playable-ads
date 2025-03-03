import { src, dest, series } from "gulp"
import htmlmin from "gulp-htmlmin"
import cleancss from "gulp-clean-css"
import terser from "gulp-terser"
import inlineSource from "gulp-inline-source"
import replace from "gulp-replace"
import { unlinkSync, rmSync } from "fs"

// Очистка dist
function cleanDist() {
  rmSync("./dist", { recursive: true, force: true })
  return Promise.resolve()
}
// Минификация CSS
async function minifyCss() {
  return src("src/styles/style.css")
    .pipe(
      cleancss({
        level: 2,
        compatibility: "es6",
      })
    )
    .pipe(dest("dist"))
}

// Минификация JS
async function minifyJs() {
  return src("src/scripts/script.js")
    .pipe(
      terser({
        ecma: 2023,
        compress: true,
        mangle: true,
      })
    )
    .pipe(dest("dist"))
}

// Минификация HTML
async function minifyHtml() {
  return src("src/index.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      })
    )
    .pipe(dest("dist"))
}

// Вставка и очистка
async function inlineFiles() {
  return src("src/index.html")
    .pipe(replace('href="style.css"', 'href="../dist/style.css"'))
    .pipe(replace('src="script.js"', 'src="../dist/script.js"'))
    .pipe(inlineSource({ compress: true, rootpath: "./dist" }))
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest("dist"))
    .on("end", () => {
      ;["style.css", "script.js"].forEach((file) => {
        try {
          unlinkSync(`./dist/${file}`)
        } catch (err) {
          if (err.code !== "ENOENT")
            console.error(`Ошибка удаления ${file}:`, err)
        }
      })
    })
}

export default series(cleanDist, minifyCss, minifyJs, minifyHtml, inlineFiles)
