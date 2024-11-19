import {
    BadRequestException,
    Inject,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcrypt';
  import { Errors } from 'src/constants/app.constants';
import { User } from 'src/entity/user.entity';
  
  @Injectable()
  export class UserService {
    constructor(
      @Inject('USERS_REPOSITORY') private _userRepository: typeof User,
      private jwtService: JwtService,
    ) {}
  
    /**
     * Function to check if the password provided matches with the one stored in our database and to return an access_token if it matches.
     * This access_token has to be provided in the subsequent request, since our API routes are protected.
     * @param username
     * @param password
     * @returns
     */
    async signIn(username: string, password: string) {
      // Query the Database to find the user with the given username
      const user = await this.findByUsername(username);
  
      // Check if the password stored matches with the password provided in the request. If it does not, throw exeception
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new UnauthorizedException(Errors.INVALID_PASSWORD);
      }
  
      // Return a JWT token with the username in the JWT payload
      const accessToken = await this.jwtService.signAsync({
        sub: user.id,
        username: username,
      });
  
      return {
        accessToken: accessToken,
        userId: user.id,
        role: user.role,
      };
    }
  
    async registerUser(username: string, password: string) {
      const user = await this.findByUsername(username);
      if (user) {
        throw new BadRequestException(Errors.USER_ALREADY_PRESENT);
      }
  
      const encyrptedPassword = await bcrypt.hash(
        password,
        await bcrypt.genSalt(),
      );
      const createdUser: User = await this._userRepository.create({
        username: username,
        password: encyrptedPassword,
      });
  
      return this.jwtService.signAsync({
        sub: createdUser.id,
        username: createdUser.username,
      });
    }
  
    /**
     * Function to fetch the user record from the table  when we have the username.
     * @param username
     * @returns
     */
    async findByUsername(username: string): Promise<User> {
      
      return await this._userRepository.findOne({
        where: { username: username },
      });
    }
  }
  