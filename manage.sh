#!/bin/bash

# If Yarn is not yet installed, run
corepack enable

# Install the dependencies
yarn install
yarn global add serve

# Upgrade dependencies version
yarn upgrade

#Clean cache
yarn cache clean

