#!/usr/bin/env bash

# Runs precommit scripts and prevents commit if failed
set -e

#Checking flow
flow

# Lint test
lint-staged & stylelint '**/*.scss'

