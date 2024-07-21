import { Module } from '@nestjs/common';
import { ServiceBookingService } from './service-booking.service';
import { ServiceBookingController } from './service-booking.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CruiseOtherServiceBookingModel, OtherServiceBookingModel } from 'src/models';
import { OtherServiceBookingRepository } from './repository/service-booking.repository';
import { CruiseOtherServiceBookingRepository } from './repository/cruise-service-booking.repository';

@Module({
  imports: [SequelizeModule.forFeature([CruiseOtherServiceBookingModel, OtherServiceBookingModel])],
  controllers: [ServiceBookingController],
  providers: [
    ServiceBookingService,
    {
      provide: 'OtherServiceBookingRepositoryInterface',
      useClass: OtherServiceBookingRepository,
    },

    {
      provide: 'CruiseOtherServiceBookingRepositoryInterface',
      useClass: CruiseOtherServiceBookingRepository,
    },
  ],
  exports: [
    ServiceBookingService,
    {
      provide: 'OtherServiceBookingRepositoryInterface',
      useClass: OtherServiceBookingRepository,
    },

    {
      provide: 'CruiseOtherServiceBookingRepositoryInterface',
      useClass: CruiseOtherServiceBookingRepository,
    },
  ],
})
export class ServiceBookingModule {}
