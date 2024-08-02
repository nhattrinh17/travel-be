import { Inject, Injectable } from '@nestjs/common';
import { BookingCruiseDto, CreateCruiseDto, CreateOrUpdateRoomTypeDto } from './dto/create-cruise.dto';
import { UpdateCruiseDetailLocation, UpdateCruiseDto, UpdateOtherBookingService, UpdateSpecialAccompaniedService, UpdateSpecialOfferCruise } from './dto/update-cruise.dto';
import { CruiseRepositoryInterface } from './interface/cruise.interface';
import { messageResponse } from 'src/constants';
import { generateSlug } from 'src/utils';
import { PaginationDto } from 'src/custom-decorator';
import { Op } from 'sequelize';
import { AccompaniedServiceModel, CruiseDetailLocationModel, CruiseModel, DetailLocationModel, ItinerariesModel, OtherServiceBookingModel, RoomCruiseModel, SpecialOfferModel } from 'src/models';
import { SpecialOfferService } from '../special-offer/special-offer.service';
import { TypeRoomRepositoryInterface } from './interface/type-room.interface';
import { CreateItinerariesDto } from '../itineraries/dto/create-itineraries.dto';
import { ItinerariesService } from '../itineraries/itineraries.service';
import { AccompaniedServiceService } from '../accompanied-service/accompanied-service.service';
import { ServiceBookingService } from '../service-booking/service-booking.service';
import { generateBookingCruiseHTML } from 'src/utils/converDataHtml';
import { BookingCruiseRepositoryInterface } from './interface/booking.interface';
import { UsersService } from '../users/users.service';
import { SendMailService } from 'src/send-mail/send-mail.service';
import { SendEmailCustomDto } from 'src/send-mail/send-mail.entity';
import { DetailLocationService } from '../detail-location/detail-location.service';

@Injectable()
export class CruiseService {
  constructor(
    @Inject('CruiseRepositoryInterface')
    private readonly cruiseRepository: CruiseRepositoryInterface,
    @Inject('TypeRoomRepositoryInterface')
    private readonly typeRoomRepository: TypeRoomRepositoryInterface,
    @Inject('BookingCruiseRepositoryInterface')
    private readonly bookingCruiseRepository: BookingCruiseRepositoryInterface,
    private readonly specialOfferService: SpecialOfferService,
    private readonly itinerariesService: ItinerariesService,
    private readonly accompaniedServiceService: AccompaniedServiceService,
    private readonly serviceBookingService: ServiceBookingService,
    private readonly sendMailService: SendMailService,
    private readonly detailLocationService: DetailLocationService,
  ) {}

  create(dto: CreateCruiseDto) {
    if (!dto.destinationId || !dto.name || !dto.contentBrief || !dto.detail || !dto.images || !dto.price) throw new Error(messageResponse.system.missingData);
    const slug = `${generateSlug(dto.name)}_${new Date().getTime()}`;
    return this.cruiseRepository.create({ ...dto, slug: slug });
  }

  async booking(dto: BookingCruiseDto) {
    if (!dto.cruiseId || !dto.dataRoomSelect.length || !dto.email) throw new Error(messageResponse.system.missingData);
    const cruiseById = await this.cruiseRepository.findOneById(dto.cruiseId);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    const detail = generateBookingCruiseHTML(dto);
    this.sendMailService.sendMailBookingCruise({
      ...dto,
      cruiseName: cruiseById.name,

      sendTo: process.env.MAIL_TO_DEFAULT,
    });
    return this.bookingCruiseRepository.create({
      ...dto,
      detail,
    });
  }

  async contactCustomer(dto: SendEmailCustomDto) {
    return this.sendMailService.sendEmailCustom(dto);
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

  async updateOtherBookingService(dto: UpdateOtherBookingService) {
    const cruiseById = await this.cruiseRepository.findOneById(dto.cruiseId);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    const deleteOld = await this.serviceBookingService.deleteCruiseServiceBooking(dto.cruiseId);
    return this.serviceBookingService.addCruiseServiceBooking(dto.cruiseId, dto.otherServices);
  }

  async updateCruiseDetailLocation(dto: UpdateCruiseDetailLocation) {
    const cruiseById = await this.cruiseRepository.findOneById(dto.cruiseId);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    const deleteOld = await this.detailLocationService.deleteCruiseDetailLocation(dto.cruiseId);
    return this.detailLocationService.addCruiseDetailLocation(dto.cruiseId, dto.detailLocationIds);
  }

  async addRoomType(dto: CreateOrUpdateRoomTypeDto) {
    if (!dto.name || !dto.totalRooms || !dto.typeBed || !dto.acreage || !dto.maxAdult) throw new Error(messageResponse.system.missingData);
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

        projection: ['id', 'name', 'price', 'priceDetail', 'totalRooms', 'typeBed', 'isViewOcean', 'acreage', 'location', 'images', 'specialService', 'content', 'maxAdult', 'maxChildren', 'amenities'],
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

  findAll(search: string, destinationId: number, detailLocationId: number, pagination: PaginationDto, sort: string, typeSort: string) {
    const filter: any = {};
    if (search) filter.name = { [Op.like]: `%${search}%` };
    if (destinationId) filter.destinationId = destinationId;
    const include: any[] = [
      { model: SpecialOfferModel, as: 'specialOffers', attributes: ['name', 'content'] },
      { model: AccompaniedServiceModel, as: 'accompaniedServices', attributes: ['name', 'slug'] },
    ];
    if (detailLocationId) {
      include.push({
        model: DetailLocationModel,
        as: 'detailLocations',
        where: { id: detailLocationId },
      });
    }
    return this.cruiseRepository.findAll(filter, {
      ...pagination,
      sort: sort,
      typeSort: typeSort,
      projection: ['id', 'name', 'totalRoom', 'reviewTripadvisor', 'linkTripadvisor', 'styleCruise', 'timeLaunched', 'contentBrief', 'slug', 'images', 'price', 'isFlashSale', 'discount', 'travelerLoves'],
      include,
    });
  }

  findAllCMS(search: string, destinationId: number, detailLocationId: number, pagination: PaginationDto, sort: string, typeSort: string) {
    const filter: any = {};
    if (search) filter.name = { [Op.like]: `%${search}%` };
    if (destinationId) filter.destinationId = destinationId;

    const include: any[] = [
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
      {
        model: OtherServiceBookingModel,
        as: 'otherServiceBookings',
        attributes: ['id'],
        // Chỉ lấy ra các trường cần thiết từ bảng trung gian
      },
      {
        model: DetailLocationModel,
        as: 'detailLocations',
        attributes: ['id'],
        // Chỉ lấy ra các trường cần thiết từ bảng trung gian
      },
    ];
    if (detailLocationId) {
      include.push({
        model: DetailLocationModel,
        as: 'detailLocations',
        where: { id: detailLocationId },
      });
    }
    return this.cruiseRepository.findAll(filter, {
      ...pagination,
      sort: sort,
      projection: ['id', 'name', 'destinationId', 'reviewTripadvisor', 'linkTripadvisor', 'totalRoom', 'styleCruise', 'timeLaunched', 'contentBrief', 'slug', 'images', 'price', 'isFlashSale', 'discount', 'travelerLoves', 'detail', 'createdAt'],
      typeSort: typeSort,
      include,
    });
  }

  findAllBookingCruise(pagination: PaginationDto, sort: string, typeSort: string) {
    const filter: any = {};

    return this.bookingCruiseRepository.findAll(filter, {
      ...pagination,
      sort: sort,
      projection: ['id', 'typeItineraries', 'date', 'totalRoom', 'fullName', 'email', 'phone', 'totalAdult', 'totalChildren', 'country', 'detail'],
      typeSort: typeSort,
      include: [
        {
          //
          model: CruiseModel,
          as: 'cruise',
          attributes: ['name'],
        },
      ],
    });
  }

  findOne(slug: string) {
    return this.cruiseRepository.findOneByCondition(
      {
        slug: slug,
      },
      ['id', 'name', 'destinationId', 'reviewTripadvisor', 'linkTripadvisor', 'totalRoom', 'styleCruise', 'timeLaunched', 'contentBrief', 'slug', 'images', 'price', 'isFlashSale', 'discount', 'travelerLoves', 'detail'],
      {
        include: [
          {
            model: SpecialOfferModel,
            as: 'specialOffers',
            attributes: ['name', 'content'],
          },
          {
            model: AccompaniedServiceModel,
            as: 'accompaniedServices',
            attributes: ['name', 'slug'],
          },
          {
            model: OtherServiceBookingModel,
            as: 'otherServiceBookings',
            attributes: ['name', 'description', 'options', 'type'],
          },
          {
            model: RoomCruiseModel,
            as: 'roomCruises',
            attributes: ['name', 'price', 'priceDetail', 'totalRooms', 'typeBed', 'isViewOcean', 'acreage', 'location', 'images', 'specialService', 'content', 'maxAdult', 'maxChildren', 'amenities'],
          },
          {
            model: ItinerariesModel,
            as: 'itineraries',
            attributes: ['name', 'day', 'description', 'content'],
          },
        ],
      },
    );
  }

  async update(id: number, dto: UpdateCruiseDto) {
    const cruiseById = await this.cruiseRepository.findOneById(id);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    const slug = `${generateSlug(dto.name)}_${new Date().getTime()}`;
    return this.cruiseRepository.findByIdAndUpdate(id, { ...dto, slug });
  }

  async remove(id: number) {
    const cruiseById = await this.cruiseRepository.findOneById(id);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    return this.cruiseRepository.softDelete(id);
  }
}
