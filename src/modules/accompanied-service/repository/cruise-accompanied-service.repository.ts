import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { CruiseAccompaniedServiceModel } from 'src/models';
import { CruiseAccompaniedServiceRepositoryInterface } from '../interface/cruise-accompanied-service.interface';
@Injectable()
export class CruiseAccompaniedServiceRepository extends BaseRepositoryAbstract<CruiseAccompaniedServiceModel> implements CruiseAccompaniedServiceRepositoryInterface {
  constructor(@InjectModel(CruiseAccompaniedServiceModel) private readonly cruiseAccompaniedServiceModel: typeof CruiseAccompaniedServiceModel) {
    super(CruiseAccompaniedServiceModel);
  }
}
