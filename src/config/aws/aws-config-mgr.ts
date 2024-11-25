// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

import { DatabaseConfig } from "../../models/ConfigTypes";

const SECRET_NAME = "prod/test/employee-node-ts/mysql";

export class ConfigFromAWS {
    private secretName: string;
    private client: SecretsManagerClient;

    constructor() {
        this.secretName = SECRET_NAME;
        this.client = new SecretsManagerClient();
    }

    public async getDatabaseCredentials(): Promise<DatabaseConfig | undefined> {
        const response = await this.client.send(
            new GetSecretValueCommand({
                SecretId: this.secretName,
                VersionStage: "AWSCURRENT",
            })
        ).then((data) => {
            const secret = JSON.parse(data.SecretString as string) as DatabaseConfig;
            console.log(`Secret: ${secret}`);
            return secret;
        }).catch((error) => {
            console.error("Error retrieving database configuration secret:", error);
            return undefined;
        });
        return response;
    }
}