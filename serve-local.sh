#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

SITE_DIR=$SCRIPT_DIR/site

python3 -m http.server -d $SITE_DIR 8000
