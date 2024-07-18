import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { PacketTourModel } from 'src/models';
import { PacketTourRepositoryInterface } from '../interface/packet-tour.interface';
@Injectable()
export class PacketTourRepository extends BaseRepositoryAbstract<PacketTourModel> implements PacketTourRepositoryInterface {
  constructor(@InjectModel(PacketTourModel) private readonly packetTourModel: typeof PacketTourModel) {
    super(PacketTourModel);
  }
}
