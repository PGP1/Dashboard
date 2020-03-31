#!/bin/bash
 
COGNITO_USER_POOL_ID=ap-southeast-2_mW9cXBpcb
 
aws cognito-idp list-users --user-pool-id $COGNITO_USER_POOL_ID |
jq -r '.Users | .[] | .Username' |
while read uname; do
  echo "Deleting $uname";
  aws cognito-idp admin-delete-user --user-pool-id $COGNITO_USER_POOL_ID --username $uname;
done