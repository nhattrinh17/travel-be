import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { CruiseOtherServiceBookingModel } from 'src/models';
import { CruiseOtherServiceBookingRepositoryInterface } from '../interface/cruise-service-booking.interface';
@Injectable()
export class CruiseOtherServiceBookingRepository extends BaseRepositoryAbstract<CruiseOtherServiceBookingModel> implements CruiseOtherServiceBookingRepositoryInterface {
  constructor(@InjectModel(CruiseOtherServiceBookingModel) private readonly cruiseOtherServiceBookingModel: typeof CruiseOtherServiceBookingModel) {
    super(CruiseOtherServiceBookingModel);
  }
}
