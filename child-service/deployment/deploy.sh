#!/bin/bash

echo -e "\n****** Deploy Child Service ******\n"

usage()
{
    echo "usage: deploy.sh -d target_deployment_directory"
}

TARGET_DIR=

while getopts :d: option
do
  case "${option}"
  in
  d) TARGET_DIR=${OPTARG};;
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

echo -e "\nbinary to copy:" $BINARY_TO_COPY
echo -e "\ntarget deployment directory: " $TARGET_DIR

echo -e "\ncopy binary to target deployment directory"
cp $BINARY_TO_COPY $TARGET_DIR