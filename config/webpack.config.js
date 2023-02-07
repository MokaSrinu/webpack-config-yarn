const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * process.cwd() will return a path to our active project directory
 * For example, on windows will look like:
 * c:\Users\username\project\webpack-boilerplate
 * On Mac:
 * /Users/username/project/webpack-boilerplate
 */
const ROOT_DIRECTORY = process.cwd();

module.exports = {
    /**
     * Define webpack mode
     * Which webpack will set NODE_ENV to 'development'
     * Docs: https://webpack.js.org/configuration/mode/
     */
    mode: 'development',
    /**
     * Here, we tell webpack where the entry point of our code
     * If you only have a single entry point you can also do it like below
     * entry: path.resolve(ROOT_DIRECTORY, 'src/index.js'),
     * Docs: https://webpack.js.org/configuration/entry-context/
     */
    entry: {
        main: path.resolve(ROOT_DIRECTORY, 'src/index.js'),
    },
    /**
     * Tell webpack where it should output
     * our bundles, assets, and anything else
     * In this example, it will be inside /build folder
     * Docs: https://webpack.js.org/configuration/output/
     */
    output: {
        path: path.resolve(ROOT_DIRECTORY, 'build'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
    },
    /**
     * This devServer option is our development server that get picked up by webpack-dev-server
     * Docs: https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
        //contentBase: path.resolve(ROOT_DIRECTORY, 'build'),
        compress: true,
        port: 3000,
        //overlay: true,
    },
    /**
     * Generate source-maps to make it easier to track down errors and warnings
     * In this example, we're using cheap-module-eval-source-map (recommend by webpack)
     * Docs: https://webpack.js.org/configuration/devtool/
     */
    devtool: 'source-map',
    module: {
        rules: [
            /**
             * Here we kinda tell webpack if it comes across js file
             * Please use babel-loader
             * Docs: https://github.com/babel/babel-loader
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // Enabled cache for faster recompilation
                        cacheDirectory: true,
                        /**
                         * Here we tell babel where to find babel config file
                         * Note that we can also put our babel config (presets and plugins) here
                         * Since Babel 7, using .babelrc filename not recommended
                         * Here we are using the new recommended filename
                         * using babel.config.js filename
                         * Docs: https://babeljs.io/docs/en/config-files
                         */
                        configFile: path.resolve(ROOT_DIRECTORY, 'config/babel.config.js'),
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    /**
                     * style-loader will inject CSS into the DOM with <style> tag
                     */
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // Enable url functions handling in css
                            url: true,
                            // Enables @import at-rules handling
                            import: true,
                            // Disable css modules
                            modules: false,
                        },
                    },
                ],
            },
            {
                test: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            modules: {
                                // Convention name of generated CSS Modules classname         
                                localIdentName: '[name]__[local]--[contenthash:8]',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /\.module\.(sass|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            modules: false,
                        },
                    },
                    // resolve-url-loader is needed for sass to correctly resolve relative url path     
                    'resolve-url-loader', {
                        loader: 'sass-loader',
                        options: {
                            // sourceMap required by resolve-url-loader  
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.module\.(sass|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            modules: {
                                // Convention name of generated CSS Modules classname         
                                localIdentName: '[name]__[local]--[contenthash:8]',
                            },
                        },
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(ROOT_DIRECTORY, 'src/index.html'),
            filename: 'index.html',
        }),
    ],
};