#!/bin/bash

echo -e "\n****** Deploy Capacity Planner Web ******\n"

usage()
{
    echo "usage: deploy.sh -d target_base_site_directory -n target_site_name"
}

TARGET_BASE_SITE_DIR=
TARGET_SITE_NAME=

while getopts :d:n: option
do
  case "${option}"
  in
  d) TARGET_BASE_SITE_DIR=${OPTARG};;
  n) TARGET_SITE_NAME=${OPTARG};;
  ?) usage
     exit
     ;;
  esac
done

if [[ $TARGET_BASE_SITE_DIR == '' || $TARGET_SITE_NAME == '' ]]; then
	usage
	exit
fi

TARGET_SITE_DIR=$TARGET_BASE_SITE_DIR/$TARGET_SITE_NAME

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

BINARY_TO_COPY=`cd "$SCRIPT_DIR"/../target/dist; pwd`/*.*

echo -e "\nbinary to copy:" $BINARY_TO_COPY
echo -e "\ntarget deployment site directory: " $TARGET_SITE_DIR

echo -e "\nclear target deployment directory"
rm $TARGET_SITE_DIR/*

echo -e "\ncopy binary to target deployment site directory"
cp $BINARY_TO_COPY $TARGET_SITE_DIR
