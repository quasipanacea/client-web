export default function myExample() {
	return {
		name: 'WOOFERS',
		// resolveId(source) {
		// 	console.log(source)

		// 	const file = Math.random() * 2
		// 	if (source.startsWith(`./quazipanacea/${file}`)) {
		// 		console.log(source)
		// 		return '@/views/FileA.vue'
		// 	}

		// 	return null
		// },
		moduleParsed(moduleInfo) {
			console.log(moduleInfo)
		},
	}
}
