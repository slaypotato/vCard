export interface UserRegisterReturn {
  username: string;
  pool: {
    userPoolId: string;
    clientId: string;
    client: {
      endpoint: string;
      fetchOptions: any;
    };
    advancedSecurityDataCollectionFlag: boolean;
  };
  Session: any;
  client: {
    endpoint: string;
    fetchOptions: any;
  };
  signInUserSession: any;
  authenticationFlowType: string;
  keyPrefix: string;
  userDataKey: string;
}
