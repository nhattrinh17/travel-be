import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { TourSpecialOfferModel } from 'src/models';
import { TourSpecialOfferRepositoryInterface } from '../interface/tour-special-offer.interface';
@Injectable()
export class TourSpecialOfferRepository extends BaseRepositoryAbstract<TourSpecialOfferModel> implements TourSpecialOfferRepositoryInterface {
  constructor(@InjectModel(TourSpecialOfferModel) private readonly tourSpecialOfferModel: typeof TourSpecialOfferModel) {
    super(TourSpecialOfferModel);
  }
}
