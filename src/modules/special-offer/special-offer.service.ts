import { Inject, Injectable } from '@nestjs/common';
import { CreateSpecialOfferDto } from './dto/create-special-offer.dto';
import { UpdateSpecialOfferDto } from './dto/update-special-offer.dto';
import { SpecialOfferRepositoryInterface } from './interface/special-offer.interface';
import { messageResponse } from 'src/constants';
import { PaginationDto } from 'src/custom-decorator';
import { Op } from 'sequelize';
import { CruiseSpecialOfferRepositoryInterface } from './interface/cruise-special-offer.interface';
import { TourSpecialOfferRepositoryInterface } from './interface/tour-special-offer.interface';

@Injectable()
export class SpecialOfferService {
  constructor(
    @Inject('SpecialOfferRepositoryInterface')
    private readonly specialOfferRepository: SpecialOfferRepositoryInterface,
    @Inject('CruiseSpecialOfferRepositoryInterface')
    private readonly cruiseSpecialOfferRepository: CruiseSpecialOfferRepositoryInterface,
    @Inject('TourSpecialOfferRepositoryInterface')
    private readonly tourSpecialOfferRepository: TourSpecialOfferRepositoryInterface,
  ) {}

  create(dto: CreateSpecialOfferDto) {
    if (!dto.name || !dto.content) throw new Error(messageResponse.system.missingData);
    return this.specialOfferRepository.create({ ...dto });
  }

  findAll(search: string, pagination: PaginationDto) {
    const filter: any = {};
    if (search) filter.search = { [Op.like]: `%${search}%` };
    return this.specialOfferRepository.findAll(filter, {
      ...pagination,
    });
  }

  findOne(id: number) {
    return this.specialOfferRepository.findOneById(id);
  }

  async update(id: number, dto: UpdateSpecialOfferDto) {
    const specialOfferById = await this.findOne(id);
    if (!specialOfferById) throw new Error(messageResponse.system.idInvalid);
    if (!dto.name || !dto.content) throw new Error(messageResponse.system.missingData);
    return this.specialOfferRepository.findByIdAndUpdate(id, dto);
  }

  deleteCruiseSpecialOffer(cruiseId: number) {
    return this.cruiseSpecialOfferRepository.permanentlyDeleteByCondition({
      cruiseId,
    });
  }

  async addCruiseSpecialOffer(cruiseId: number, specialOfferIds: number[]) {
    const checkSpecialOff = await Promise.all(specialOfferIds.map((id) => this.findOne(id)));
    if (checkSpecialOff.includes(null)) throw Error(messageResponse.specialOffer.idInvalid);
    return Promise.all(
      specialOfferIds.map((id) =>
        this.cruiseSpecialOfferRepository.create({
          cruiseId,
          specialOfferId: id,
        }),
      ),
    );
  }

  deleteTourSpecialOffer(tourId: number) {
    return this.tourSpecialOfferRepository.permanentlyDeleteByCondition({
      tourId,
    });
  }

  async addTourSpecialOffer(tourId: number, specialOfferIds: number[]) {
    const checkSpecialOff = await Promise.all(specialOfferIds.map((id) => this.findOne(id)));
    if (checkSpecialOff.includes(null)) throw Error(messageResponse.specialOffer.idInvalid);
    return Promise.all(
      specialOfferIds.map((id) =>
        this.tourSpecialOfferRepository.create({
          tourId,
          specialOfferId: id,
        }),
      ),
    );
  }
}
