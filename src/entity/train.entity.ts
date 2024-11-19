import {
  Model,
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'Trains' })
export class Train extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  trainId: number;

  @Column
  name: string;

  @Column
  source: string;

  @Column
  destination: string;

  @Column
  startTime: Date;

  @Column
  endTime: Date;

  @Column
  totalSeats: number;

  @Column
  isActive: boolean;

  @Column
  isDeleted: boolean;

  @Column
  price: number;
}
