import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { databaseProvider, TrainsProvider, UsersProvider } from 'src/configuration/database.provider';
import { jwtSecret } from 'src/constants/app.constants';
import { AppController } from 'src/controllers/app.controller';
import { TrainsController } from 'src/controllers/trains/trains.controller';
import { UserController } from 'src/controllers/user/user.controller';
import { AppService } from 'src/services/app.service';
import { TrainsService } from 'src/services/trains.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [JwtModule.register({ secret: jwtSecret })],
  controllers: [AppController, TrainsController, UserController],
  providers: [AppService, TrainsService, databaseProvider, TrainsProvider, UsersProvider, UserService],
})
export class AppModule {}
