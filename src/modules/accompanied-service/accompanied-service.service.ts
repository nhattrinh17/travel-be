import { Inject, Injectable } from '@nestjs/common';
import { CreateAccompaniedServiceDto } from './dto/create-accompanied-service.dto';
import { UpdateAccompaniedServiceDto } from './dto/update-accompanied-service.dto';
import { TourAccompaniedServiceRepositoryInterface } from './interface/tour-accompanied-service.interface';
import { CruiseAccompaniedServiceRepositoryInterface } from './interface/cruise-accompanied-service.interface';
import { AccompaniedServiceRepositoryInterface } from './interface/accompanied-service.interface';
import { messageResponse } from 'src/constants';

@Injectable()
export class AccompaniedServiceService {
  constructor(
    @Inject('TourAccompaniedServiceRepositoryInterface')
    private readonly tourAccompaniedServiceRepository: TourAccompaniedServiceRepositoryInterface,
    @Inject('CruiseAccompaniedServiceRepositoryInterface')
    private readonly cruiseAccompaniedServiceRepository: CruiseAccompaniedServiceRepositoryInterface,
    @Inject('AccompaniedServiceRepositoryInterface')
    private readonly accompaniedServiceRepository: AccompaniedServiceRepositoryInterface,
  ) {}

  create(dto: CreateAccompaniedServiceDto) {
    if (!dto.name || !dto.slug) throw new Error(messageResponse.system.missingData);
    return this.accompaniedServiceRepository.create({ ...dto });
  }

  findOne(id: number) {
    return this.accompaniedServiceRepository.findOneById(id);
  }

  async update(id: number, dto: UpdateAccompaniedServiceDto) {
    const AccompaniedServiceById = await this.findOne(id);
    if (!AccompaniedServiceById) throw new Error(messageResponse.system.idInvalid);
    // if (!dto.name || !dto.content) throw new Error(messageResponse.system.missingData);
    return this.accompaniedServiceRepository.findByIdAndUpdate(id, dto);
  }

  deleteCruiseAccompaniedService(cruiseId: number) {
    return this.cruiseAccompaniedServiceRepository.permanentlyDeleteByCondition({
      cruiseId,
    });
  }

  async addCruiseAccompaniedService(cruiseId: number, accompaniedServiceIds: number[]) {
    const checkSpecialOff = await Promise.all(accompaniedServiceIds.map((id) => this.findOne(id)));
    if (checkSpecialOff.includes(null)) throw Error(messageResponse.accompaniedServiceId.idInvalid);
    return Promise.all(
      accompaniedServiceIds.map((id) =>
        this.cruiseAccompaniedServiceRepository.create({
          cruiseId,
          accompaniedServiceId: id,
        }),
      ),
    );
  }

  deleteTourAccompaniedService(tourId: number) {
    return this.tourAccompaniedServiceRepository.permanentlyDeleteByCondition({
      tourId,
    });
  }

  async addTourAccompaniedService(tourId: number, accompaniedServiceIds: number[]) {
    const checkSpecialOff = await Promise.all(accompaniedServiceIds.map((id) => this.findOne(id)));
    if (checkSpecialOff.includes(null)) throw Error(messageResponse.accompaniedServiceId.idInvalid);
    return Promise.all(
      accompaniedServiceIds.map((id) =>
        this.tourAccompaniedServiceRepository.create({
          tourId,
          accompaniedServiceId: id,
        }),
      ),
    );
  }
}
