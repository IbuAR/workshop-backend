import { IsNumber, IsNotEmpty } from 'class-validator';
export class CreateBookingDto {
        
        @IsNumber()
        @IsNotEmpty()
        userId: number;

        @IsNumber()
        @IsNotEmpty()
        seatCount: number;

        @IsNumber()
        @IsNotEmpty()
        traindId: number;
}