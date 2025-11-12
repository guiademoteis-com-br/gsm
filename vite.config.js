import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    // build: {
    //     rollupOptions: {
    //         output: {
    //             entryFileNames: 'gsm.js',
    //         },
    //     },
    // },
    build: {
        lib: {
            entry: 'src/main.js', // seu arquivo de entrada JS
            name: 'GSM',
            fileName: 'gsm',
            formats: ['es'],
        },
    },
});
