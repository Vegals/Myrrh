import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  appType: 'custom',
  build: {
    manifest: false,
    outDir: 'theme/assets',
    emptyOutDir: false,
    minify: false,
    target: 'es2015',
    rollupOptions: {
      input: {
        styles: './src/css/theme/styles.css',
        critical: './src/js/critical/import-critical.js',
        theme: './src/js/theme/import--theme.js',
        collection: './src/js/collection/import--collection.js',
        'collection-css': './src/css/collection/import--collection.css',
        product: './src/js/product/import--product.js',
        'product-css': './src/css/product/import--product.css',
        password: './src/js/password/password.js',
        'password-css': './src/css/password/import--password.css',
      },
      output: {
        dir: 'theme/assets',
        entryFileNames: '[name].js',
        assetFileNames: ({ name }) => {
          if (name.endsWith('.css')) {
            return `${name.replace('-css', '')}`;
          }
          const extType = name.split('.').at(-1);
          return `[name].${extType}`;
        },
        format: 'es',
        generatedCode: {
          symbols: true
        },
        preserveModules: false,
        indent: true,
        compact: false,
        extend: true
      }
    }
  }
});
