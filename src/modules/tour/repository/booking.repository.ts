import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { BookingTourModel } from 'src/models';
import { BookingTourRepositoryInterface } from '../interface/booking.interface';
@Injectable()
export class BookingTourRepository extends BaseRepositoryAbstract<BookingTourModel> implements BookingTourRepositoryInterface {
  constructor(@InjectModel(BookingTourModel) private readonly bookingTourModel: typeof BookingTourModel) {
    super(BookingTourModel);
  }
}
