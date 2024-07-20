import { Inject, Injectable } from '@nestjs/common';
import { CreateCruiseDto, CreateOrUpdateRoomTypeDto } from './dto/create-cruise.dto';
import { UpdateCruiseDto, UpdateSpecialAccompaniedService, UpdateSpecialOfferCruise } from './dto/update-cruise.dto';
import { CruiseRepositoryInterface } from './interface/cruise.interface';
import { messageResponse } from 'src/constants';
import { generateSlug } from 'src/utils';
import { PaginationDto } from 'src/custom-decorator';
import { Op } from 'sequelize';
import { AccompaniedServiceModel, ItinerariesModel, RoomCruiseModel, SpecialOfferModel } from 'src/models';
import { SpecialOfferService } from '../special-offer/special-offer.service';
import { TypeRoomRepositoryInterface } from './interface/type-room.interface';
import { CreateItinerariesDto } from '../itineraries/dto/create-itineraries.dto';
import { ItinerariesService } from '../itineraries/itineraries.service';
import { AccompaniedServiceService } from '../accompanied-service/accompanied-service.service';

@Injectable()
export class CruiseService {
  constructor(
    @Inject('CruiseRepositoryInterface')
    private readonly cruiseRepository: CruiseRepositoryInterface,
    @Inject('TypeRoomRepositoryInterface')
    private readonly typeRoomRepository: TypeRoomRepositoryInterface,
    private readonly specialOfferService: SpecialOfferService,
    private readonly itinerariesService: ItinerariesService,
    private readonly accompaniedServiceService: AccompaniedServiceService,
  ) {}

  create(dto: CreateCruiseDto) {
    if (!dto.destinationId || !dto.detailLocationId || !dto.name || !dto.contentBrief || !dto.detail || !dto.images || !dto.price) throw new Error(messageResponse.system.missingData);
    const slug = `${generateSlug(dto.name)}_${new Date().getTime}`;
    return this.cruiseRepository.create({ ...dto, slug: slug });
  }

  addOrUpdateItinerariesTour(dto: CreateItinerariesDto) {
    if (dto.itinerariesId) {
      return this.itinerariesService.update(dto.itinerariesId, dto);
    }
    return this.itinerariesService.create(dto);
  }

  async updateSpecialOffer(dto: UpdateSpecialOfferCruise) {
    const cruiseById = await this.cruiseRepository.findOneById(dto.cruiseId);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    const deleteOld = await this.specialOfferService.deleteCruiseSpecialOffer(dto.cruiseId);
    return this.specialOfferService.addCruiseSpecialOffer(dto.cruiseId, dto.specialOfferIds);
  }

  async updateAccompaniedService(dto: UpdateSpecialAccompaniedService) {
    const cruiseById = await this.cruiseRepository.findOneById(dto.cruiseId);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    const deleteOld = await this.accompaniedServiceService.deleteCruiseAccompaniedService(dto.cruiseId);
    return this.accompaniedServiceService.addCruiseAccompaniedService(dto.cruiseId, dto.accompaniedServiceIds);
  }

  async addRoomType(dto: CreateOrUpdateRoomTypeDto) {
    if (!dto.name || !dto.price || !dto.totalRooms || !dto.typeBed || !dto.acreage || !dto.maxPerson) throw new Error(messageResponse.system.missingData);
    const cruiseById = await this.cruiseRepository.findOneById(dto.cruiseId);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    return this.typeRoomRepository.create(dto);
  }

  async updateRoomType(dto: CreateOrUpdateRoomTypeDto) {
    const roomById = await this.typeRoomRepository.findOneById(dto.roomId);
    if (!roomById) throw new Error(messageResponse.system.idInvalid);
    return this.typeRoomRepository.findByIdAndUpdate(dto.roomId, dto);
  }

  async getAllRoomCruise(idCruise: number) {
    return this.typeRoomRepository.findAll(
      {
        cruiseId: idCruise,
      },
      {
        limit: 100,
        offset: 0,
        page: 1,

        projection: ['id', 'name', 'price', 'totalRooms', 'typeBed', 'isViewOcean', 'acreage', 'location', 'images', 'specialService', 'content', 'maxPerson', 'amenities'],
      },
    );
  }

  async getAllItinerariesCruise(idCruise: number) {
    return this.itinerariesService.findAll(
      {
        cruiseId: idCruise,
      },
      {
        limit: 100,
        offset: 0,
        page: 1,
        sort: 'day',
        typeSort: 'ASC',
        projection: ['id', 'day', 'name', 'description', 'content'],
      },
    );
  }

  findAll(destinationId: number, detailLocationId: number, pagination: PaginationDto, sort: string, typeSort: string) {
    const filter: any = {};
    if (destinationId) filter.destinationId = destinationId;
    if (detailLocationId) filter.detailLocationId = detailLocationId;
    return this.cruiseRepository.findAll(filter, {
      ...pagination,
      sort: sort,
      typeSort: typeSort,
      projection: ['id', 'name', 'totalRoom', 'styleCruise', 'timeLaunched', 'contentBrief', 'slug', 'images', 'price', 'isFlashSale', 'discount', 'travelerLoves'],
      include: [{ model: SpecialOfferModel, as: 'specialOffers' }],
    });
  }

  findAllCMS(search: string, destinationId: number, detailLocationId: number, pagination: PaginationDto, sort: string, typeSort: string) {
    const filter: any = {};
    if (search) filter.name = { [Op.like]: `%${search}%` };
    if (destinationId) filter.destinationId = destinationId;
    if (detailLocationId) filter.detailLocationId = detailLocationId;
    return this.cruiseRepository.findAll(filter, {
      ...pagination,
      sort: sort,
      projection: ['id', 'name', 'totalRoom', 'styleCruise', 'timeLaunched', 'contentBrief', 'slug', 'images', 'price', 'isFlashSale', 'discount', 'travelerLoves', 'detail'],
      typeSort: typeSort,
      include: [
        {
          //
          model: SpecialOfferModel,
          as: 'specialOffers',
          attributes: ['id'],
        },
        {
          model: AccompaniedServiceModel,
          as: 'accompaniedServices',
          attributes: ['id'],
          // Chỉ lấy ra các trường cần thiết từ bảng trung gian
        },
      ],
    });
  }

  findOne(id: number) {
    return this.cruiseRepository.findOneById(id, ['name', 'contentBrief', 'detail', 'slug', 'images', 'price', 'isFlashSale', 'discount', 'travelerLoves'], {
      include: [
        { model: SpecialOfferModel, as: 'specialOffers' },
        { model: RoomCruiseModel, as: 'roomCruises' },
        { model: ItinerariesModel, as: 'itineraries' },
      ],
    });
  }

  async update(id: number, dto: UpdateCruiseDto) {
    const cruiseById = await this.cruiseRepository.findOneById(id);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    return this.cruiseRepository.findByIdAndUpdate(id, dto);
  }

  async remove(id: number) {
    const cruiseById = await this.cruiseRepository.findOneById(id);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    return this.cruiseRepository.softDelete(id);
  }
}
