import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { BookingCruiseModel } from 'src/models';
import { BookingCruiseRepositoryInterface } from '../interface/booking.interface';
@Injectable()
export class BookingCruiseRepository extends BaseRepositoryAbstract<BookingCruiseModel> implements BookingCruiseRepositoryInterface {
  constructor(@InjectModel(BookingCruiseModel) private readonly bookingCruiseModel: typeof BookingCruiseModel) {
    super(BookingCruiseModel);
  }
}
