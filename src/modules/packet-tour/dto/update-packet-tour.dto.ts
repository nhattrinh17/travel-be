import { PartialType } from '@nestjs/mapped-types';
import { CreatePacketTourDto } from './create-packet-tour.dto';

export class UpdatePacketTourDto extends PartialType(CreatePacketTourDto) {}
