import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { CruiseSpecialOfferModel } from 'src/models';
import { CruiseSpecialOfferRepositoryInterface } from '../interface/cruise-special-offer.interface';
@Injectable()
export class CruiseSpecialOfferRepository extends BaseRepositoryAbstract<CruiseSpecialOfferModel> implements CruiseSpecialOfferRepositoryInterface {
  constructor(@InjectModel(CruiseSpecialOfferModel) private readonly cruiseSpecialOfferModel: typeof CruiseSpecialOfferModel) {
    super(CruiseSpecialOfferModel);
  }
}
