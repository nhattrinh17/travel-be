import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TourModel } from 'src/models';
import { SpecialOfferModule } from '../special-offer/special-offer.module';
import { TourRepository } from './repository/tour.repository';
import { ItinerariesModule } from '../itineraries/itineraries.module';
import { AccompaniedServiceModule } from '../accompanied-service/accompanied-service.module';

@Module({
  imports: [AccompaniedServiceModule, ItinerariesModule, SpecialOfferModule, SequelizeModule.forFeature([TourModel])],
  controllers: [TourController],
  providers: [
    TourService,
    {
      provide: 'TourRepositoryInterface',
      useClass: TourRepository,
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
