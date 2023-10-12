const path = require('path')

module.exports = {
	resolve: {
		alias: {
			'@client': path.resolve(__dirname, '../src/'),
			'@quasipanacea': path.resolve(
				__dirname,
				'../../server/dependencies/@quasipanacea/',
			),
		},
	},
}
