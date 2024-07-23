import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { CruiseDetailLocationModel } from 'src/models';
import { CruiseDetailLocationRepositoryInterface } from '../interface/cruise-detail-location.interface';
@Injectable()
export class CruiseDetailLocationRepository extends BaseRepositoryAbstract<CruiseDetailLocationModel> implements CruiseDetailLocationRepositoryInterface {
  constructor(@InjectModel(CruiseDetailLocationModel) private readonly cruiseDetailLocationModel: typeof CruiseDetailLocationModel) {
    super(CruiseDetailLocationModel);
  }
}
