#!/bin/bash

# set current working directory to the directory of this script?

TEST_DIR=$(dirname "$0")
cd "${TEST_DIR}"

test () {
  echo ""
  echo "___ Testing ${TEST_DIR}/$1.yaml ___"
  $(npm bin)/ts-node ../src/main.ts $1.yaml > ./$1.stdout.log 2> ./$1.stderr.log

  # Now, let's compare the output with the golden file (i.e. expected output)
  git --no-pager diff $1.*.log
  echo ""
}

# Test suite
test sample-grading

# Return a non-zero error code if any output file has changed
exit $(git diff | wc -l)
