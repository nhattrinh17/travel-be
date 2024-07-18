import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { RoomCruiseModel } from 'src/models';
import { TypeRoomRepositoryInterface } from '../interface/type-room.interface';
@Injectable()
export class TypeRoomRepository extends BaseRepositoryAbstract<RoomCruiseModel> implements TypeRoomRepositoryInterface {
  constructor(@InjectModel(RoomCruiseModel) private readonly roomCruiseModel: typeof RoomCruiseModel) {
    super(RoomCruiseModel);
  }
}
