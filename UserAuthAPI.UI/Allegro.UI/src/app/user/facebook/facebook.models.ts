export namespace FacebookModels {
    export let LoginStatuses = {
        connected: "connected",
        unknown: 'unknown'
    }
    export class AuthResponseObj {
        status: string;
        authResponse: AuthResponse;
    }
    export interface FacebookAppSettings {
        appId: string,
        cookie: boolean,
        xfbml: boolean,
        version: string
    }
    class AuthResponse {
        accessToken: string;
        expiresIn: number;
        signedRequest: string;
        userID: string;
    }
}