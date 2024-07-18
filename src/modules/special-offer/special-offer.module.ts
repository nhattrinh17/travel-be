import { Module } from '@nestjs/common';
import { SpecialOfferService } from './special-offer.service';
import { SpecialOfferController } from './special-offer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CruiseSpecialOfferModel, SpecialOfferModel, TourSpecialOfferModel } from 'src/models';
import { SpecialOfferRepository } from './repository/special-offer.repository';
import { CruiseSpecialOfferRepository } from './repository/cruise-special-offer.repository';
import { TourSpecialOfferRepository } from './repository/tour-special-offer.repository';

@Module({
  imports: [SequelizeModule.forFeature([SpecialOfferModel, CruiseSpecialOfferModel, TourSpecialOfferModel])],
  controllers: [SpecialOfferController],
  providers: [
    SpecialOfferService,
    {
      provide: 'SpecialOfferRepositoryInterface',
      useClass: SpecialOfferRepository,
    },
    {
      provide: 'CruiseSpecialOfferRepositoryInterface',
      useClass: CruiseSpecialOfferRepository,
    },
    {
      provide: 'TourSpecialOfferRepositoryInterface',
      useClass: TourSpecialOfferRepository,
    },
  ],
  exports: [
    SpecialOfferService,
    {
      provide: 'SpecialOfferRepositoryInterface',
      useClass: SpecialOfferRepository,
    },
    {
      provide: 'CruiseSpecialOfferRepositoryInterface',
      useClass: CruiseSpecialOfferRepository,
    },
    {
      provide: 'TourSpecialOfferRepositoryInterface',
      useClass: TourSpecialOfferRepository,
    },
  ],
})
export class SpecialOfferModule {}
