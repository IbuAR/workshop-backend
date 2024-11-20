import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AddTrainDto, UpdateTrainDto } from 'src/dto/train.dto';
import { Train } from 'src/entity/train.entity';

@Injectable()
export class TrainsService {
  constructor(
    @Inject('SEQUELIZE') private sequelize: Sequelize,
    @Inject('TRAINS_REPOSITORY') private _trainsRepository: typeof Train,
  ) {}

  async getTrains() {
    let query = `
            SELECT 
                t.trainId,
                t.name,
                t.source,
                t.destination,
                t.startTime,
                t.endTime,
                t.totalSeats,
                t.price,
                t.isActive,
                t.totalSeats - COALESCE(SUM(b.SeatCount), 0) AS availableSeats
            FROM 
                Trains t
            LEFT JOIN 
                Bookings b ON t.trainId = b.trainId
            WHERE t.isDeleted = 0 
            GROUP BY t.trainId
        `;

    const data = await this.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return data;
  }

  async searchTrains(source: string, destination: string, date: string) {
    const data = await this._trainsRepository.findAll({
      where: {
        source,
        destination,
        [Op.and]: [
          sequelize.where(sequelize.fn('DATE', sequelize.col('endTime')), date),
        ],
      },
    });

    return data;
  }

  async updateTrain(request: UpdateTrainDto, trainId: number) {
    await this._trainsRepository.update<Train>(
      {
        startTime: request.startTime,
        endTime: request.endTime,
        totalSeats: request.totalSeats,
        isActive: request.isActive,
      },
      { where: { trainId: trainId } },
    );
  }
  async deleteTrain(trainId: number) {
    await this._trainsRepository.update<Train>(
      { isDeleted: true },
      { where: { trainId: trainId } },
    );
  }

  async addTrain(request: AddTrainDto) {
    const createdTrain: Train = await this._trainsRepository.create({
      name: request.name,
      source: request.source,
      destination: request.destination,
      endTime: request.endTime,
      startTime: request.startTime,
      totalSeats: request.totalSeats,
      price: request.price,
    });
    return createdTrain.trainId;
  }
}
