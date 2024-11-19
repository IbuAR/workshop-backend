import { Model, AutoIncrement, Column, PrimaryKey, ForeignKey, Table, BelongsTo, HasOne } from 'sequelize-typescript';
import { User } from './user.entity';
import { Train } from './train.entity';

@Table({ tableName: 'Bookings' })
export class Booking extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  bookingId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Train)
  @Column
  trainId: number;

  @Column
  bookingDate: Date;

  @Column
  seatCount: number;

  @Column
  isActive: boolean;

  // Associations
  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Train)
  train: Train;
}
