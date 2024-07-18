import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { CruiseModel } from 'src/models';
import { CruiseRepositoryInterface } from '../interface/cruise.interface';
@Injectable()
export class CruiseRepository extends BaseRepositoryAbstract<CruiseModel> implements CruiseRepositoryInterface {
  constructor(@InjectModel(CruiseModel) private readonly cruiseModel: typeof CruiseModel) {
    super(CruiseModel);
  }
}
