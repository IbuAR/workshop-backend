import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { UserLoginRequestDTO, UserRegisterRequestDTO } from 'src/dto/user.dto';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {


    constructor(private userService: UserService){
    }
    
    @Post('/login')
    @Public()
    async signInUser(@Body() userLoginRequestDto : UserLoginRequestDTO){
        const loginResponse = await this.userService.signIn(userLoginRequestDto.username, userLoginRequestDto.password);
        return loginResponse;
    }

    @Post('/register')
    @Public()
    async registerUser(@Body() userRegisterRequestDTO: UserRegisterRequestDTO){
       const accessToken = await this.userService.registerUser(userRegisterRequestDTO.username, userRegisterRequestDTO.password);
       return {
        access_token: accessToken,
        message: "User registered successfully"
       };
    }
}
