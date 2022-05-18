// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { VueLoaderPlugin } = require('vue-loader')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const EslintWebpackPlugin = require('eslint-webpack-plugin')

/**
 * @type { import('webpack').Configuration }
 */
const config = {
	entry: './src/main.ts',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		filename: 'bundle.js',
		publicPath: '/' // 产出文件的路径前缀
		// libraryTarget: "module",
	},
	devServer: {
		port: 8000,
		open: true,
		hot: true,
		// compress: true, // 是否启用压缩
		client: {
			logging: 'none'
		},
		static: path.resolve(__dirname, 'static') // 额外的静态资源目录（以前的contentBase）
	},
	devtool: false,
	// experiments: {
	// 	outputModule: true
	// },
	externals: {
		// vue: 'vue'
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@st-ui': path.resolve(__dirname, 'packages')
		},
		// 将 `.ts` 添加为一个可解析的扩展名。
		extensions: ['.ts', '.js', '.vue', '.css', '...']
	},
	module: {
		// 指定要加载的规则
		rules: [
			{
				// test 指定的是规则生效的文件
				test: /\.ts$/,
				// 要使用的 loader
				loader: 'ts-loader',
				// 要排除的文件
				exclude: /node_modules/,
				options: { appendTsSuffixTo: [/\.vue$/] }
			},
			{
				// test 指定的是规则生效的文件
				test: /\.vue$/,
				// 要使用的 loader
				use: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							// indentedSyntax: true,
							// sass-loader version >= 8
							// sassOptions: {
							//   indentedSyntax: true
							// }
						}
					}
				]
			}
		]
	},
	// watchOptions: {
	//   poll: true
	// },
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './public/index.html')
		}),
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			// 就是在vue@3.0.0-rc.3版本开始，强烈推荐我们设置  __VUE_OPTIONS_API__, __VUE_PROD_DEVTOOLS__  两个属性，例如使用 DefinePlugin，我们在webpack的plugins中可以这样设置：
			// https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false
		}),
		new EslintWebpackPlugin({
			extensions: ['js', 'ts', 'vue'],
			exclude: ['node_modules', 'dist'],
			fix: true
		})
		//热更新插件
		// new webpack.HotModuleReplacementPlugin()
	]
}

module.exports = config
