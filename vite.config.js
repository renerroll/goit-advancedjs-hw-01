import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

function getPages(directory, pages = {}) {
  console.log(directory);
  const items = fs.readdirSync(directory);

  items.forEach(item => {
    const itemPath = resolve(directory, item);
    if (fs.statSync(itemPath).isDirectory()) {
      getPages(itemPath, pages);
    } else if (item.endsWith('.html')) {
      const name = item.replace('.html', '');
      pages[name] = itemPath;
    }
  });
  return pages;
}

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: resolve(__dirname, 'src'),
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
          ...getPages(resolve(__dirname, 'src/public')),
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'commonHelpers.js',
        },
      },
      outDir: '../dist',
    },
    plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
  };
});