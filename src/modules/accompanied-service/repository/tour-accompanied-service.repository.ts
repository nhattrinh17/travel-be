import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { TourAccompaniedServiceModel } from 'src/models';
import { TourAccompaniedServiceRepositoryInterface } from '../interface/tour-accompanied-service.interface';
@Injectable()
export class TourAccompaniedServiceRepository extends BaseRepositoryAbstract<TourAccompaniedServiceModel> implements TourAccompaniedServiceRepositoryInterface {
  constructor(@InjectModel(TourAccompaniedServiceModel) private readonly tourAccompaniedServiceModel: typeof TourAccompaniedServiceModel) {
    super(TourAccompaniedServiceModel);
  }
}
