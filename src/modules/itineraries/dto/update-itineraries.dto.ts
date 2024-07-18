import { PartialType } from '@nestjs/mapped-types';
import { CreateItinerariesDto } from './create-itineraries.dto';

export class UpdateItinerariesDto extends PartialType(CreateItinerariesDto) {}
