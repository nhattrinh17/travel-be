import { PartialType } from '@nestjs/mapped-types';
import { CreateAccompaniedServiceDto } from './create-accompanied-service.dto';

export class UpdateAccompaniedServiceDto extends PartialType(CreateAccompaniedServiceDto) {}
