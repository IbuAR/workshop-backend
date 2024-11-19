// JWT secret used to sign the access token
export const jwtSecret = "JwtSecret";

/**
 * Enum containing the roles for Role based access control
 */
export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
};


export const Errors = {
    TOKEN_NOT_FOUND : "Token not found in the request",
    INVALID_PASSWORD: "Password does not match",
    USER_ALREADY_PRESENT: 'User with the same username already exists, Please select a different user'
};