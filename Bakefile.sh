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
	task.init
	task.build

	rm -rf './output'
	mkdir -p './output'
	tar -cz --transform 's,^\.,output,' -f './output/build.tar.gz' './dist'

	./common/scripts/publish.sh './output/build.tar.gz'
}
