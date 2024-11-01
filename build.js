const esbuild = require('esbuild');
const copyStaticFiles = require('esbuild-plugin-copy').default;

esbuild
    .build({
        entryPoints: ['./src/index.ts'],
        bundle: true,
        platform: 'node',
        outfile: 'dist/cli.js',
        minify: true,
        target: ['node14'],
        sourcemap: true,
        external: ['fs', 'path'],
        format: 'cjs',
        logLevel: 'info',
        loader: {
            '.ts': 'ts',
            '.json': 'json',
        },
        plugins: [
            copyStaticFiles({
                resolveFrom: 'cwd',
                assets: [
                    {
                        from: './src/templates/karma.config.template.js',
                        to: './dist/templates',
                    },
                    {
                        from: './src/templates/mainTemplate.ts',
                        to: './dist/templates',
                    },
                    {
                        from: './src/templates/viteConfigTemplate.ts',
                        to: './dist/templates',
                    },
                ],
            }),
        ],
    })
    .then(() => {
        console.log('Build and file copy completed successfully.');
    })
    .catch((error) => {
        console.error('Build failed:', error);
        process.exit(1);
    });
