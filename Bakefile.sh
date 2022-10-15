# shellcheck shell=bash

task.init() {
	pnpm install
}

task.dev() {
	pnpm dev
}

task.build () {
	pnpm build
}

task.release-nightly() {
	task.build

	# Build
	mkdir -p './output'
	tar czf './output/build.tar.gz' './dist'

	util.publish './output/build.tar.gz'
}

util.publish() {
	local file="$1"
	bake.assert_not_empty 'file'

	local tag_name='nightly'
	git tag -fa "$tag_name" -m ''
	git push origin ":refs/tags/$tag_name"
	git push --tags
	gh release upload "$tag_name" "$file" --clobber
	gh release edit --draft=false nightly
}
