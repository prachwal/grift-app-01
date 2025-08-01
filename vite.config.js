import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
// https://vite.dev/config/
export default defineConfig({
    plugins: [preact()],
    resolve: {
        alias: {
            "react": "preact/compat",
            "react-dom": "preact/compat"
        }
    },
    server: {
        fs: {
            allow: ['..']
        }
    },
    // @ts-ignore
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts'
    }
});
