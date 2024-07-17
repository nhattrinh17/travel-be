import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { DestinationModel } from 'src/models';
import { DestinationRepositoryInterface } from '../interface/destination.interface';
@Injectable()
export class DestinationRepository extends BaseRepositoryAbstract<DestinationModel> implements DestinationRepositoryInterface {
  constructor(@InjectModel(DestinationModel) private readonly destinationModel: typeof DestinationModel) {
    super(DestinationModel);
  }
}
