import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { BookingsProvider, databaseProvider, TrainsProvider, UsersProvider } from 'src/configuration/database.provider';
import { jwtSecret } from 'src/constants/app.constants';
import { AppController } from 'src/controllers/app.controller';
import { BookingsController } from 'src/controllers/bookings/bookings.controller';
import { TrainsController } from 'src/controllers/trains/trains.controller';
import { UserController } from 'src/controllers/user/user.controller';
import { AuthGuard } from 'src/guards/auth.guard';
import { AppService } from 'src/services/app.service';
import { BookingsService } from 'src/services/bookings.service';
import { TrainsService } from 'src/services/trains.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [JwtModule.register({ secret: jwtSecret })],
  controllers: [AppController, TrainsController, UserController, BookingsController],
  providers: [AppService, TrainsService, databaseProvider, TrainsProvider, UsersProvider, BookingsProvider, UserService, BookingsService ,    {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule {}
