#!/bin/bash

usage()
{
    echo "usage: deploy.sh -t target_deployment_directory"
}

TARGET_DIR=

while getopts :t: option
do
  case "${option}"
  in
  t) TARGET_DIR=${OPTARG};;
  ?) usage
     exit
     ;;
  esac
done

if [[ $TARGET_DIR == '' ]]; then
	usage
	exit
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

BINARY_TO_COPY=`cd "$SCRIPT_DIR"/../target; pwd`/ChildService.war

echo "binary to copy:" $BINARY_TO_COPY
echo "target deployment directory: " $TARGET_DIR

cp $BINARY_TO_COPY $TARGET_DIR