/* eslint-disable */
const path = require('path')
const madge = require('madge')
const { writeFile } = require('fs/promises')

;(async () => {
	const result = await madge(path.join(__dirname, '../src/main.ts'), {
		baseDir: path.join(__dirname, '..'),
		includeNpm: true,
		fileExtensions: ['js', 'ts', 'vue', 'css'],
		excludeRegExp: [],
		requireConfig: null,
		webpackConfig: path.join(__dirname, './webpack.config.js'),
		tsConfig: path.join(__dirname, './tsconfig.json'),
		detectiveOptions: {
			debug: true,
			filter() {
				return (path) => path.indexOf('node_modules') === -1
			},
		},
		dependencyFilter() {
			return true
		},
	})
	console.warn(result.warnings())
	const svg = await result.svg()
	await writeFile(path.join(__dirname, 'dependencies.svg'), svg.toString())
})()

// Returns a dependency tree object for the given file
// const tree = dependencyTree({
// 	filename: path.join(__dirname, '../src/main.ts'),
// 	// directory: 'path/to/all/files',
// 	// requireConfig: 'path/to/requirejs/config',
// 	webpackConfig: path.join(__dirname, './webpack.config.js'),
// 	// tsConfig: '../',
// 	nodeModulesConfig: {
// 		entry: 'module',
// 	},
// 	// filter: (path) => path.indexOf('node_modules') === -1,
// 	nonExistent: [],
// 	noTypeDefinitions: false,
// })

// // Returns a post-order traversal (list form) of the tree with duplicate sub-trees pruned.
// // This is useful for bundling source files, because the list gives the concatenation order.
// // Note: you can pass the same arguments as you would to dependencyTree()
// const list = dependencyTree.toList({
// 	filename: 'path/to/a/file',
// 	directory: 'path/to/all/files',
// })
