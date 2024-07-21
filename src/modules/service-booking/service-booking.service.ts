import { Inject, Injectable } from '@nestjs/common';
import { CreateServiceBookingDto } from './dto/create-service-booking.dto';
import { UpdateServiceBookingDto } from './dto/update-service-booking.dto';
import { CruiseOtherServiceBookingRepositoryInterface } from './interface/cruise-service-booking.interface';
import { OtherServiceBookingRepositoryInterface } from './interface/service-booking.interface';
import { messageResponse } from 'src/constants';
import { PaginationDto } from 'src/custom-decorator';

@Injectable()
export class ServiceBookingService {
  constructor(
    @Inject('OtherServiceBookingRepositoryInterface')
    private readonly otherServiceBookingRepository: OtherServiceBookingRepositoryInterface,
    @Inject('CruiseOtherServiceBookingRepositoryInterface')
    private readonly CruiseOtherServiceBookingRepository: CruiseOtherServiceBookingRepositoryInterface,
  ) {}

  create(dto: CreateServiceBookingDto) {
    if (!dto.name || !dto.description) throw new Error(messageResponse.system.missingData);
    return this.otherServiceBookingRepository.create({ ...dto });
  }

  findOne(id: number) {
    return this.otherServiceBookingRepository.findOneById(id);
  }

  findAll(pagination: PaginationDto) {
    return this.otherServiceBookingRepository.findAll(
      {},
      {
        ...pagination,
        projection: ['id', 'name', 'type', 'description', 'createdAt'],
      },
    );
  }

  async update(id: number, dto: UpdateServiceBookingDto) {
    const ServiceBookingById = await this.findOne(id);
    if (!ServiceBookingById) throw new Error(messageResponse.system.idInvalid);
    // if (!dto.name || !dto.content) throw new Error(messageResponse.system.missingData);
    return this.otherServiceBookingRepository.findByIdAndUpdate(id, dto);
  }

  deleteCruiseServiceBooking(cruiseId: number) {
    return this.CruiseOtherServiceBookingRepository.permanentlyDeleteByCondition({
      cruiseId,
    });
  }

  async addCruiseServiceBooking(cruiseId: number, ServiceBookingIds: number[]) {
    const checkSpecialOff = await Promise.all(ServiceBookingIds.map((id) => this.findOne(id)));
    if (checkSpecialOff.includes(null)) throw Error(messageResponse.system.idInvalid);
    return Promise.all(
      ServiceBookingIds.map((id) =>
        this.CruiseOtherServiceBookingRepository.create({
          cruiseId,
          ServiceBookingId: id,
        }),
      ),
    );
  }
}
