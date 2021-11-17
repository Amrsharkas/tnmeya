#!/bin/bash

#Whenever you clone a repo, you do not clone all of its branches by default.
#If you wish to do so, use the following script:

for branch in `cd $1 && git branch -a | grep remotes | grep -v HEAD | grep -v development `; do
   cd $1 && git branch --track ${branch#remotes/origin/} $branch
done
