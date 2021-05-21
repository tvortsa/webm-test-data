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
import CopyWebpackPlugin from 'copy-webpack-plugin';
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
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
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
            templateParameters: {
                slogan: data.page_meta.h1,
                keywords: data.page_meta.meta_keywords,
                descript: data.page_meta.meta_description,
                title: data.title,
                content: 'bar',
                brdcrmbs: data.breadcrumbs,
                navig: data.nav,
                stock: data.stock
            },
            minify: false,
            inject: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/images',
                    to: './images'
                }
              ],
            })
        // new HtmlWebpackPugPlugin(),
        // new CleanWebpackPlugin(['dist']),
    ]
}