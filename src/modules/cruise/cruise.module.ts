import { Module } from '@nestjs/common';
import { CruiseService } from './cruise.service';
import { CruiseController } from './cruise.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingCruiseModel, CruiseModel, RoomCruiseModel } from 'src/models';
import { CruiseRepository } from './repository/cruise.repository';
import { TypeRoomRepository } from './repository/type-room.repository';
import { SpecialOfferModule } from '../special-offer/special-offer.module';
import { ItinerariesModule } from '../itineraries/itineraries.module';
import { AccompaniedServiceModule } from '../accompanied-service/accompanied-service.module';
import { ServiceBookingModule } from '../service-booking/service-booking.module';
import { BookingCruiseRepository } from './repository/booking.repository';

@Module({
  imports: [
    //
    ServiceBookingModule,
    AccompaniedServiceModule,
    ItinerariesModule,
    SpecialOfferModule,
    SequelizeModule.forFeature([CruiseModel, RoomCruiseModel, BookingCruiseModel]),
  ],
  controllers: [CruiseController],
  providers: [
    CruiseService,
    {
      provide: 'CruiseRepositoryInterface',
      useClass: CruiseRepository,
    },
    {
      provide: 'TypeRoomRepositoryInterface',
      useClass: TypeRoomRepository,
    },
    {
      provide: 'BookingCruiseRepositoryInterface',
      useClass: BookingCruiseRepository,
    },
  ],
  exports: [
    CruiseService,
    {
      provide: 'CruiseRepositoryInterface',
      useClass: CruiseRepository,
    },
    {
      provide: 'TypeRoomRepositoryInterface',
      useClass: TypeRoomRepository,
    },
    {
      provide: 'BookingCruiseRepositoryInterface',
      useClass: BookingCruiseRepository,
    },
  ],
})
export class CruiseModule {}
