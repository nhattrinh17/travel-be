import { Inject, Injectable } from '@nestjs/common';
import { CreateItinerariesDto } from './dto/create-itineraries.dto';
import { UpdateItinerariesDto } from './dto/update-itineraries.dto';
import { ItinerariesRepositoryInterface } from './interface/itineraries.interface';
import { messageResponse } from 'src/constants';
import { PaginationDto } from 'src/custom-decorator';
import { Op } from 'sequelize';

@Injectable()
export class ItinerariesService {
  constructor(
    @Inject('ItinerariesRepositoryInterface')
    private readonly itinerariesRepository: ItinerariesRepositoryInterface,
  ) {}

  create(dto: CreateItinerariesDto) {
    if (!dto.name || !dto.content || (!dto.cruiseId && !dto.tourId)) throw new Error(messageResponse.system.missingData);
    return this.itinerariesRepository.create({ ...dto });
  }

  findAll(filter: object, options: any) {
    return this.itinerariesRepository.findAll(filter, options);
  }

  findOne(id: number) {
    return this.itinerariesRepository.findOneById(id);
  }

  async update(id: number, dto: UpdateItinerariesDto) {
    const itinerariesById = await this.findOne(id);
    if (!itinerariesById) throw new Error(messageResponse.system.idInvalid);
    // if (!dto.name || !dto.content) throw new Error(messageResponse.system.missingData);
    return this.itinerariesRepository.findByIdAndUpdate(id, dto);
  }

  async delete(id: number) {
    const itinerariesById = await this.findOne(id);
    if (!itinerariesById) throw new Error(messageResponse.system.idInvalid);
    return this.itinerariesRepository.permanentlyDelete(id);
  }
}
