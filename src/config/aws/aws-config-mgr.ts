// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { get } from "http";
import { DatabaseConfig } from "../../models/ConfigTypes";

const SECRET_NAME = "prot/test/employee-node-ts/mysql";

// const client = new SecretsManagerClient({
//     region: "us-west-2",
// });


// function getDatabaseCredentials() {
//     async function getDataBaseConfiguration(secret_name: string): Promise<DatabaseConfig | undefined> {
//         // const client = new SecretsManagerClient({ region: "your-region" });
//         const client = new SecretsManagerClient();
//         let response;

//         try {
//             response = await client.send(
//                 new GetSecretValueCommand({
//                     SecretId: secret_name,
//                     VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
//                 })
//             );

//             const secret = JSON.parse(response.SecretString as string) as DatabaseConfig;
//             console.log(`Secret: ${secret}`);
//             return secret;
//         } catch (error) {
//             // For a list of exceptions thrown, see
//             // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
//             throw error;
//         }
//     }
// }
// Your code goes here

export class ConfigFromAWS {
    private secretName: string;
    private client: SecretsManagerClient;

    constructor() {
        this.secretName = SECRET_NAME;
        this.client = new SecretsManagerClient({});
    }

    // constructor(secretName: string, region: string) {
    //     this.secretName = secretName;
    //     this.client = new SecretsManagerClient({ region });
    // }

    public async getDatabaseCredentials(): Promise<DatabaseConfig | undefined> {
        try {
            const response = await this.client.send(
                new GetSecretValueCommand({
                    SecretId: this.secretName,
                    VersionStage: "AWSCURRENT",
                })
            );

            const secret = JSON.parse(response.SecretString as string) as DatabaseConfig;
            console.log(`Secret: ${secret}`);
            return secret;
        } catch (error) {
            throw error;
        }
    }
}