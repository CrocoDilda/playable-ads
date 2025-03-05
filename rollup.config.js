import resolve from "@rollup/plugin-node-resolve"
import path from "path"

export default {
  input: "src/scripts/main.js", // Главный файл твоего проекта
  output: {
    file: "src/intermediate/scripts/bundle.js", // Путь, куда будет собран финальный файл
    format: "iife", // Immediately Invoked Function Expression, подходящий формат для браузеров
    sourcemap: true, // Источник карты для отладки
  },
  plugins: [
    resolve(), // Плагин для разрешения импортов из node_modules
  ],
}
