import { PartialType } from '@nestjs/mapped-types';
import { CreateCruiseDto } from './create-cruise.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCruiseDto extends PartialType(CreateCruiseDto) {}

export class UpdateSpecialOfferCruise {
  @ApiProperty({ name: 'cruiseId', type: Number, description: 'Id Cruise' })
  cruiseId: number;

  @ApiProperty({ name: 'specialOfferIds', type: [Number], description: 'Danh sachs id specialOffer' })
  specialOfferIds: number[];
}
