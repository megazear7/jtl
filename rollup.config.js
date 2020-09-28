import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import minify from 'rollup-plugin-babel-minify';

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
        plugins: []
    }
}, {
    input: 'src/index.js',
    output: {
        file: 'dist/jtl-umd.min.js',
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
            }),
            minify()
        ]
    }
}, {
    input: 'src/index.js',
    output: {
        file: 'dist/jtl-cjs.min.js',
        format: 'cjs',
        name: 'jtl',
        plugins: [
            ["@babel/plugin-transform-modules-commonjs", {
                "allowTopLevelThis": true
            }],
            minify()
        ]
    }
}, {
    input: 'src/index.js',
    output: {
        file: 'dist/jtl-esm.min.js',
        plugins: [minify()]
    }
}];