import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Errors } from 'src/constants/app.constants';
import { PUBLIC_KEY } from 'src/decorator/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  /**
   * This method determines if a request can be allowed or denied, based on the return type. 
   * The request will be allowed if the API to which the request is made is public or if the access_token provided is valid
   * @param context
   * @returns
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if the route is public by looking for the PUBLIC_KEY metadata, which is set in the API level using the @Public annotation
    const isPublic = this.reflector.getAllAndOverride(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If the API is public then we allow the request to proceed further, else we check and verify the authorization token.
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    // Throw 403 error if the token is the authorization header is not present. Authorization header is supposed to contain the access token
    if (!request.headers.authorization) {
      throw new UnauthorizedException(Errors.TOKEN_NOT_FOUND);
    }

    // Authorization header is of type  - 'Bearer access_token'. Split the header to obtain the access token alone.
    const [type, token] = request.headers.authorization.split(' ') ?? [];

    // Throw 403 error if the token is the access token is not present
    if (!token) {
      throw new UnauthorizedException(Errors.TOKEN_NOT_FOUND);
    }

    // Verify if the token is a valid JWT token.
    const payload = await this.jwtService.verifyAsync(token);

    // Add the username to the request payload so that it can be used later in the request if required
    request['username'] = payload.username;

    // Return true as the request contains a valid JWT token
    return true;
  }
}
