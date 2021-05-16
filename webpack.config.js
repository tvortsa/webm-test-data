import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackPugPlugin from 'html-webpack-pug-plugin';

export default {
    entry: './index.js',
    mode: 'production',
    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'output.pug',
            minify: false
        }),
        new HtmlWebpackPugPlugin()
    ]
}