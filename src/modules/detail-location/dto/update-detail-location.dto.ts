import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailLocationDto } from './create-detail-location.dto';

export class UpdateDetailLocationDto extends PartialType(CreateDetailLocationDto) {}
