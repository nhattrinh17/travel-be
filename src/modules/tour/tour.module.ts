import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingTourModel, TourModel } from 'src/models';
import { SpecialOfferModule } from '../special-offer/special-offer.module';
import { TourRepository } from './repository/tour.repository';
import { ItinerariesModule } from '../itineraries/itineraries.module';
import { AccompaniedServiceModule } from '../accompanied-service/accompanied-service.module';
import { BookingTourRepository } from './repository/booking.repository';
import { SendMailService } from 'src/send-mail/send-mail.service';

@Module({
  imports: [
    //
    AccompaniedServiceModule,
    ItinerariesModule,
    SpecialOfferModule,
    SequelizeModule.forFeature([TourModel, BookingTourModel]),
  ],
  controllers: [TourController],
  providers: [
    SendMailService,
    TourService,
    {
      provide: 'TourRepositoryInterface',
      useClass: TourRepository,
    },
    {
      provide: 'BookingTourRepositoryInterface',
      useClass: BookingTourRepository,
    },
  ],
  exports: [
    TourService,
    {
      provide: 'TourRepositoryInterface',
      useClass: TourRepository,
    },
  ],
})
export class TourModule {}
