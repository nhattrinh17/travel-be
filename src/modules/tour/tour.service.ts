import { Inject, Injectable } from '@nestjs/common';
import { CreateTourDto, UpdateSpecialOfferTourDto } from './dto/create-tour.dto';
import { UpdateSpecialAccompaniedService, UpdateTourDto } from './dto/update-tour.dto';
import { TourRepositoryInterface } from './interface/tour.interface';
import { generateSlug } from 'src/utils';
import { ItinerariesModel, SpecialOfferModel } from 'src/models';
import { PaginationDto } from 'src/custom-decorator';
import { Op } from 'sequelize';
import { TypeTour, messageResponse } from 'src/constants';
import { SpecialOfferService } from '../special-offer/special-offer.service';
import { ItinerariesService } from '../itineraries/itineraries.service';
import { CreateItinerariesDto } from '../itineraries/dto/create-itineraries.dto';
import { AccompaniedServiceService } from '../accompanied-service/accompanied-service.service';

@Injectable()
export class TourService {
  constructor(
    @Inject('TourRepositoryInterface')
    private readonly tourRepository: TourRepositoryInterface,
    private readonly specialOfferService: SpecialOfferService,
    private readonly itinerariesService: ItinerariesService,
    private readonly accompaniedServiceService: AccompaniedServiceService,
  ) {}

  create(dto: CreateTourDto) {
    if (!dto.packetTourId || !dto.name || !dto.contentBrief || !dto.detail || !dto.images || !dto.price) throw new Error(messageResponse.system.missingData);
    const slug = `${generateSlug(dto.name)}_${new Date().getTime}`;
    return this.tourRepository.create({ ...dto, slug: slug, type: dto.packetTourId ? TypeTour.Packet : TypeTour.Daily });
  }

  addOrUpdateItinerariesTour(dto: CreateItinerariesDto) {
    if (dto.itinerariesId) {
      this.itinerariesService.update(dto.itinerariesId, dto);
    }
    return this.itinerariesService.create(dto);
  }

  async updateAccompaniedService(dto: UpdateSpecialAccompaniedService) {
    const cruiseById = await this.tourRepository.findOneById(dto.tourId);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    const deleteOld = await this.accompaniedServiceService.deleteCruiseAccompaniedService(dto.tourId);
    return this.accompaniedServiceService.addCruiseAccompaniedService(dto.tourId, dto.accompaniedServiceIds);
  }

  async updateSpecialOffer(dto: UpdateSpecialOfferTourDto) {
    const cruiseById = await this.tourRepository.findOneById(dto.tourId);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    const deleteOld = await this.specialOfferService.deleteTourSpecialOffer(dto.tourId);
    return this.specialOfferService.addTourSpecialOffer(dto.tourId, dto.specialOfferIds);
  }

  findAll(packetTourId: number, type: number, pagination: PaginationDto, sort: string, typeSort: string) {
    const filter: any = {};
    if (packetTourId) filter.packetTourId = packetTourId;
    if (typeof type == 'number') filter.type = type;
    return this.tourRepository.findAll(filter, {
      ...pagination,
      sort: sort,
      typeSort: typeSort,
      projection: ['name', 'contentBrief', 'slug', 'images', 'price', 'isFlashSale', 'discount', 'travelerLoves'],
      include: [{ model: SpecialOfferModel, as: 'specialOffers' }],
    });
  }

  findAllCMS(search: string, packetTourId: number, type: number, pagination: PaginationDto, sort: string, typeSort: string) {
    const filter: any = {};
    if (search) filter.name = { [Op.like]: `%${search}%` };
    if (packetTourId) filter.packetTourId = packetTourId;
    if (typeof type == 'number') filter.type = type;
    return this.tourRepository.findAll(filter, {
      ...pagination,
      sort: sort,
      typeSort: typeSort,
    });
  }

  findOne(id: number) {
    return this.tourRepository.findOneById(id, ['name', 'contentBrief', 'detail', 'slug', 'images', 'price', 'isFlashSale', 'discount', 'travelerLoves'], {
      include: [
        { model: SpecialOfferModel, as: 'specialOffers' },
        { model: ItinerariesModel, as: 'itineraries' },
      ],
    });
  }

  async update(id: number, dto: UpdateTourDto) {
    const cruiseById = await this.tourRepository.findOneById(id);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    return this.tourRepository.findByIdAndUpdate(id, dto);
  }

  async remove(id: number) {
    const cruiseById = await this.tourRepository.findOneById(id);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    return this.tourRepository.softDelete(id);
  }

  async removeItineraries(id: number) {
    return this.itinerariesService.delete(id);
  }
}
