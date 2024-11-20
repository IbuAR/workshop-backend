import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddTrainDto, SearchTrainDto, UpdateTrainDto } from 'src/dto/train.dto';
import { TrainsService } from 'src/services/trains.service';

@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async addTrain(@Body() request: AddTrainDto) {
    const trainId: number = await this.trainsService.addTrain(request);
    return {
      trainId: trainId,
      message: 'Train added successfully',
    };
  }

  @Get()
  async getTrains() {
    return await this.trainsService.getTrains();
  }

  @Get('search')
  async searchTrains(
    @Query(
      new ValidationPipe({
        transform: true,
      }),
    )
    request: SearchTrainDto,
  ) {
    return await this.trainsService.searchTrains(
      request.source,
      request.destination,
      request.date,
    );
  }

  @Put(':trainId')
  @UsePipes(ValidationPipe)
  async updateTrain(
    @Body() request: UpdateTrainDto,
    @Param('trainId', ParseIntPipe) trainId: number,
  ) {
    await this.trainsService.updateTrain(request, trainId);

    return {
      trainId: trainId,
      message: 'Train updated successfully',
    };
  }

  @Delete(':trainId')
  async deleteTrain(@Param('trainId', ParseIntPipe) trainId: number) {
    await this.trainsService.deleteTrain(trainId);
    return {
      trainId: trainId,
      message: 'Train deleted successfully',
    };
  }
}
