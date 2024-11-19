import { Body, Controller, Get, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBookingDto } from 'src/dto/bookings.dto';
import { BookingsService } from 'src/services/bookings.service';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @Post()
    @UsePipes(ValidationPipe)
    addTrain(@Body() request: CreateBookingDto) {
        return this.bookingsService.addBooking(request);
    }

    @Get()
    getTrains(@Query('userId', ParseIntPipe) userId: number){
        return this.bookingsService.getBookings(userId);
    }
}
