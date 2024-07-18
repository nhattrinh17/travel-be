import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { AccompaniedServiceModel } from 'src/models';
import { AccompaniedServiceRepositoryInterface } from '../interface/accompanied-service.interface';
@Injectable()
export class AccompaniedServiceRepository extends BaseRepositoryAbstract<AccompaniedServiceModel> implements AccompaniedServiceRepositoryInterface {
  constructor(@InjectModel(AccompaniedServiceModel) private readonly accompaniedServiceModel: typeof AccompaniedServiceModel) {
    super(AccompaniedServiceModel);
  }
}
