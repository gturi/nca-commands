module.exports = function (name = 'w') {
  return `#!/bin/bash

  BOOKMARK_DIR="$HOME/.shell-bookmarks"

  # create bookmark directory if it does not exists
  [ -d "$BOOKMARK_DIR" ] || mkdir "$BOOKMARK_DIR"

  if [ -d "$BOOKMARK_DIR" ]; then
      export CDPATH=".:$BOOKMARK_DIR:/"

      function ${name} {
          # $1: bookmark name
          # shellcheck disable=SC2016
          [ "$#" -ne "1" ] && echo 'Usage: ${name} $bookmarkName' && return 1

          # shellcheck disable=SC2086
          TARGET="$(nca shell-bookmarks bookmark-target $1)"
          # shellcheck disable=SC2164
          builtin cd "$TARGET"
      }

      # bookmarkTarget completion
      _${name}() {
          # ask yargs to generate completions.
          type_list=$(nca --get-yargs-completions shell-bookmarks bookmark-target)

          # TODO: only first argument after "${name}" is considered
          # shellcheck disable=SC2207
          COMPREPLY=($(compgen -W "\${type_list}" -- "$2"))

          # if no match was found, fall back to filename completion
          if [ \${#COMPREPLY[@]} -eq 0 ]; then
              COMPREPLY=()
          fi

          return 0
      }
      complete -o bashdefault -o default -F _${name} ${name}
  fi`
}
