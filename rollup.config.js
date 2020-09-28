import { getBabelOutputPlugin } from '@rollup/plugin-babel';

export default [{
    input: 'src/index.js',
    output: {
        file: 'dist/jtl-umd.js',
        format: 'umd',
        name: 'jtl',
        plugins: [
            getBabelOutputPlugin({
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            "targets": {
                                "ie": "11"
                            }
                        }
                    ]
                ],
                allowAllFormats: true
            })
        ]
    }
}, {
    input: 'src/index.js',
    output: {
        file: 'dist/jtl-cjs.js',
        format: 'cjs',
        name: 'jtl',
        plugins: [
            ["@babel/plugin-transform-modules-commonjs", {
                "allowTopLevelThis": true
            }]
        ]
    }
}, {
    input: 'src/index.js',
    output: {
        file: 'dist/jtl-esm.js',
        plugins: [ ]
    }
}];