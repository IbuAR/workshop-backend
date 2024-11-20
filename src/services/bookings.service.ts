import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { CreateBookingDto } from 'src/dto/bookings.dto';
import { Booking } from 'src/entity/booking.entity';
import { Train } from 'src/entity/train.entity';

@Injectable()
export class BookingsService {
  constructor(
    @Inject('SEQUELIZE') private sequelize: Sequelize,
    @Inject('TRAINS_REPOSITORY') private _trainsRepository: typeof Train,
    @Inject('BOOKINGS_REPOSITORY') private _bookingsRepository: typeof Booking,
  ) {}

  async addBooking(request: CreateBookingDto) {
    const booking = await this._bookingsRepository.create({
      userId: request.userId,
      trainId: request.trainId,
      bookingDate: new Date(),
      seatCount: request.seatCount,
      isActive: true,
    });

    return booking;
  }

  async getBookings(userId: number) {
    const bookings = await this._bookingsRepository.findAll({
      where: {
        userId: userId,
        isActive: true,
      },
      include: [Train],
    });

    return bookings.map((booking) => {
      return {
        trainId: booking.train.trainId,
        name: booking.train.name,
        source: booking.train.source,
        destination: booking.train.destination,
        startTime: booking.train.startTime,
        endTime: booking.train.endTime,
        seatCount: booking.seatCount,
      };
    });
  }
}
