import { PartialType } from '@nestjs/mapped-types';
import { CreateTourDto } from './create-tour.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTourDto extends PartialType(CreateTourDto) {}

export class UpdateSpecialAccompaniedService {
  @ApiProperty({ name: 'tourId', type: Number, description: 'Id tour' })
  tourId: number;

  @ApiProperty({ name: 'accompaniedServiceIds', type: [Number], description: 'Danh sachs id specialOffer' })
  accompaniedServiceIds: number[];
}
