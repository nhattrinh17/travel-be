import { Inject, Injectable } from '@nestjs/common';
import { BookingTourDto, CreateTourDto, UpdateSpecialOfferTourDto } from './dto/create-tour.dto';
import { UpdateSpecialAccompaniedService, UpdateTourDto } from './dto/update-tour.dto';
import { TourRepositoryInterface } from './interface/tour.interface';
import { generateSlug } from 'src/utils';
import { AccompaniedServiceModel, ItinerariesModel, SpecialOfferModel, TourModel } from 'src/models';
import { PaginationDto } from 'src/custom-decorator';
import { Op } from 'sequelize';
import { TypeTour, messageResponse } from 'src/constants';
import { SpecialOfferService } from '../special-offer/special-offer.service';
import { ItinerariesService } from '../itineraries/itineraries.service';
import { CreateItinerariesDto } from '../itineraries/dto/create-itineraries.dto';
import { AccompaniedServiceService } from '../accompanied-service/accompanied-service.service';
import { BookingTourRepositoryInterface } from './interface/booking.interface';
import { SendMailService } from 'src/send-mail/send-mail.service';
import { generateBookingTourHtml } from 'src/utils/converDataHtml';
import { SendEmailCustomDto } from 'src/send-mail/send-mail.entity';

@Injectable()
export class TourService {
  constructor(
    @Inject('TourRepositoryInterface')
    private readonly tourRepository: TourRepositoryInterface,
    @Inject('BookingTourRepositoryInterface')
    private readonly bookingTourRepository: BookingTourRepositoryInterface,
    private readonly specialOfferService: SpecialOfferService,
    private readonly itinerariesService: ItinerariesService,
    private readonly accompaniedServiceService: AccompaniedServiceService,
    private readonly sendMailService: SendMailService,
  ) {}

  create(dto: CreateTourDto) {
    if (!dto.name || !dto.contentBrief || !dto.detail || !dto.price) throw new Error(messageResponse.system.missingData);
    const slug = `${generateSlug(dto.name)}_${new Date().getTime()}`;
    return this.tourRepository.create({ ...dto, slug: slug, type: dto.packetTourId ? TypeTour.Packet : TypeTour.Daily });
  }

  async booking(dto: BookingTourDto) {
    if (!dto.tourId || !dto.email) throw new Error(messageResponse.system.missingData);
    const cruiseById = await this.tourRepository.findOneById(dto.tourId);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    const detail = generateBookingTourHtml(dto);
    this.sendMailService.sendMailBookingTour({
      ...dto,
      tourName: cruiseById.name,
      sendTo: process.env.MAIL_TO_DEFAULT,
    });
    return this.bookingTourRepository.create({
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

  async updateAccompaniedService(dto: UpdateSpecialAccompaniedService) {
    const cruiseById = await this.tourRepository.findOneById(dto.tourId);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    const deleteOld = await this.accompaniedServiceService.deleteTourAccompaniedService(dto.tourId);
    return this.accompaniedServiceService.addTourAccompaniedService(dto.tourId, dto.accompaniedServiceIds);
  }

  async updateSpecialOffer(dto: UpdateSpecialOfferTourDto) {
    const cruiseById = await this.tourRepository.findOneById(dto.tourId);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    const deleteOld = await this.specialOfferService.deleteTourSpecialOffer(dto.tourId);
    return this.specialOfferService.addTourSpecialOffer(dto.tourId, dto.specialOfferIds);
  }

  findAll(search: string, packetTourId: number, type: number, pagination: PaginationDto, sort: string, typeSort: string) {
    const filter: any = {};
    if (type) filter.type = type;
    if (search) filter.name = { [Op.like]: `%${search}%` };
    if (packetTourId) {
      filter.packetTourId = packetTourId;
      filter.type = TypeTour.Packet;
    }

    return this.tourRepository.findAll(filter, {
      ...pagination,
      sort: sort,
      typeSort: typeSort,
      projection: ['name', 'contentBrief', 'slug', 'images', 'price', 'isFlashSale', 'discount', 'travelerLoves'],
      include: [
        { model: SpecialOfferModel, as: 'specialOffers', attributes: ['name', 'content'] },
        { model: AccompaniedServiceModel, as: 'accompaniedServices', attributes: ['name', 'slug'] },
      ],
    });
  }

  findAllTourNav() {
    return this.tourRepository.findAll(
      {
        type: TypeTour.Daily,
      },
      {
        limit: 20,
        offset: 0,
        page: 1,
        sort: 'isFlashSale',
        typeSort: 'DESC',
        projection: ['name', 'slug', 'images', 'createdAt'],
      },
    );
  }

  findAllCMS(search: string, packetTourId: number, type: number, pagination: PaginationDto, sort: string, typeSort: string) {
    const filter: any = {};
    if (search) filter.name = { [Op.like]: `%${search}%` };
    if (packetTourId) filter.packetTourId = packetTourId;
    if (type >= 0) filter.type = type;
    return this.tourRepository.findAll(filter, {
      ...pagination,
      projection: ['id', 'createdAt', 'name', 'contentBrief', 'detail', 'slug', 'images', 'price', 'isFlashSale', 'discount', 'travelerLoves', 'type', 'packetTourId'],
      sort: sort,
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

  findAllBookingTour(pagination: PaginationDto, sort: string, typeSort: string) {
    const filter: any = {};

    return this.bookingTourRepository.findAll(filter, {
      ...pagination,
      sort: sort,
      projection: ['id', 'date', 'quantity', 'fullName', 'email', 'phone', 'country', 'detail'],
      typeSort: typeSort,
      include: [
        {
          //
          model: TourModel,
          as: 'tour',
          attributes: ['name'],
        },
      ],
    });
  }

  findOne(slug: string) {
    return this.tourRepository.findOneByCondition(
      {
        slug: slug,
      },
      ['id', 'name', 'packetTourId', 'contentBrief', 'detail', 'slug', 'images', 'price', 'isFlashSale', 'discount', 'travelerLoves'],
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
            model: ItinerariesModel,
            as: 'itineraries',
            attributes: ['name', 'day', 'description', 'content'],
          },
        ],
      },
    );
  }

  async getAllItinerariesCruise(idTour: number) {
    return this.itinerariesService.findAll(
      {
        tourId: idTour,
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

  async update(id: number, dto: UpdateTourDto) {
    const cruiseById = await this.tourRepository.findOneById(id);
    if (!cruiseById) throw new Error(messageResponse.system.idInvalid);
    const slug = `${generateSlug(dto.name)}_${new Date().getTime()}`;
    if (dto.type == TypeTour.Daily) dto.packetTourId = null;
    return this.tourRepository.findByIdAndUpdate(id, { ...dto, slug });
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
