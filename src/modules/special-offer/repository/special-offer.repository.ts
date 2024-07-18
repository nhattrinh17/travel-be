import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { SpecialOfferModel } from 'src/models';
import { SpecialOfferRepositoryInterface } from '../interface/special-offer.interface';
@Injectable()
export class SpecialOfferRepository extends BaseRepositoryAbstract<SpecialOfferModel> implements SpecialOfferRepositoryInterface {
  constructor(@InjectModel(SpecialOfferModel) private readonly specialOfferModel: typeof SpecialOfferModel) {
    super(SpecialOfferModel);
  }
}
