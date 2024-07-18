import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { TourModel } from 'src/models';
import { TourRepositoryInterface } from '../interface/tour.interface';
@Injectable()
export class TourRepository extends BaseRepositoryAbstract<TourModel> implements TourRepositoryInterface {
  constructor(@InjectModel(TourModel) private readonly tourModel: typeof TourModel) {
    super(TourModel);
  }
}
