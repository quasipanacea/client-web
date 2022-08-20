# shellcheck shell=bash

task.dev() {
	PATH="$HOME/.local/state/woof/installs/nodejs/v18.7.0/files/bin:$PATH" yarn dev
}