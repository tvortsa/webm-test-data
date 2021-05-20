import { fileURLToPath } from 'url';
import { dirname } from 'path';

import * as fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PAGES_DIR = `./src/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))
const data = JSON.parse(fs.readFileSync('data.json'))

console.dir(`data: ${data.page_meta.h1}`);

import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackPugPlugin from 'html-webpack-pug-plugin';
// import CleanWebpackPlugin from 'clean-webpack-plugin';

export default {

    module: {

        rules: [
            {
                test: /\.pug$/,
                exclude: /(node_modules)/,
                use: [
                    'pug-loader?pretty=true',
                    // {loader: ''}
                ]
            }
        ]
    },

    entry: './index.js',
    mode: 'development',
    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/index.pug`,
            filename: 'index.html',
            minify: false,
            inject: true
        }),
        // new HtmlWebpackPugPlugin(),
        // new CleanWebpackPlugin(['dist']),
    ]
}