import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_IPDlSpUe8",
    ClientId: "dmggu2344sbnouk4mtoa79ige"
}

export default new CognitoUserPool(poolData);