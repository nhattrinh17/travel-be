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

export class UpdateSpecialAccompaniedService {
  @ApiProperty({ name: 'cruiseId', type: Number, description: 'Id Cruise' })
  cruiseId: number;

  @ApiProperty({ name: 'accompaniedServiceIds', type: [Number], description: 'Danh sachs id specialOffer' })
  accompaniedServiceIds: number[];
}

export class UpdateOtherBookingService {
  @ApiProperty({ name: 'cruiseId', type: Number, description: 'Id Cruise' })
  cruiseId: number;

  @ApiProperty({ name: 'accompaniedServiceIds', type: [Number], description: 'Danh sachs id specialOffer' })
  otherServices: number[];
}

export class UpdateCruiseDetailLocation {
  @ApiProperty({ name: 'cruiseId', type: Number, description: 'Id Cruise' })
  cruiseId: number;

  @ApiProperty({ name: 'accompaniedServiceIds', type: [Number], description: 'Danh sachs id specialOffer' })
  detailLocationIds: number[];
}
