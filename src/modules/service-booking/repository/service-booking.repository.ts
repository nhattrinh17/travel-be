import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { OtherServiceBookingModel } from 'src/models';
import { OtherServiceBookingRepositoryInterface } from '../interface/service-booking.interface';
@Injectable()
export class OtherServiceBookingRepository extends BaseRepositoryAbstract<OtherServiceBookingModel> implements OtherServiceBookingRepositoryInterface {
  constructor(@InjectModel(OtherServiceBookingModel) private readonly otherServiceBookingModel: typeof OtherServiceBookingModel) {
    super(OtherServiceBookingModel);
  }
}
