import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { DetailLocationModel } from 'src/models';
import { DetailLocationRepositoryInterface } from '../interface/detail-location.interface';
@Injectable()
export class DetailLocationRepository extends BaseRepositoryAbstract<DetailLocationModel> implements DetailLocationRepositoryInterface {
  constructor(@InjectModel(DetailLocationModel) private readonly detailLocationModel: typeof DetailLocationModel) {
    super(DetailLocationModel);
  }
}
