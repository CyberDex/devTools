import eslintPlugin from '@nabla/vite-plugin-eslint';
import { defineConfig } from 'vite';

export default defineConfig(({ _, mode }) => {
    const isProd = mode === 'production';

    return {
        build: {
            minify: isProd,
            emptyOutDir: true,
        },
        plugins: [
            eslintPlugin({
                failOnWarning: isProd,
                failOnError: isProd,
            }),
        ],
        server: {
            host: true,
            port: 4200,
            https: true,
        },
        define: {
            APP_VERSION: JSON.stringify(process.env.npm_package_version),
            APP_NAME: JSON.stringify(process.env.npm_package_name),
        },
        envDir: 'env',
        base: '/'
    };
});
