import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { ItinerariesModel } from 'src/models';
import { ItinerariesRepositoryInterface } from '../interface/itineraries.interface';
@Injectable()
export class ItinerariesRepository extends BaseRepositoryAbstract<ItinerariesModel> implements ItinerariesRepositoryInterface {
  constructor(@InjectModel(ItinerariesModel) private readonly itinerariesModel: typeof ItinerariesModel) {
    super(ItinerariesModel);
  }
}
