import { Module } from '@nestjs/common';
import { AccompaniedServiceService } from './accompanied-service.service';
import { AccompaniedServiceController } from './accompanied-service.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccompaniedServiceModel, CruiseAccompaniedServiceModel, TourAccompaniedServiceModel } from 'src/models';
import { AccompaniedServiceRepository } from './repository/accompanied-service.repository';
import { TourAccompaniedServiceRepository } from './repository/tour-accompanied-service.repository';
import { CruiseAccompaniedServiceRepository } from './repository/cruise-accompanied-service.repository';

@Module({
  imports: [SequelizeModule.forFeature([AccompaniedServiceModel, TourAccompaniedServiceModel, CruiseAccompaniedServiceModel])],
  controllers: [AccompaniedServiceController],
  providers: [
    AccompaniedServiceService,
    {
      provide: 'AccompaniedServiceRepositoryInterface',
      useClass: AccompaniedServiceRepository,
    },
    {
      provide: 'TourAccompaniedServiceRepositoryInterface',
      useClass: TourAccompaniedServiceRepository,
    },
    {
      provide: 'CruiseAccompaniedServiceRepositoryInterface',
      useClass: CruiseAccompaniedServiceRepository,
    },
  ],
  exports: [
    AccompaniedServiceService,
    {
      provide: 'AccompaniedServiceRepositoryInterface',
      useClass: AccompaniedServiceRepository,
    },
    {
      provide: 'TourAccompaniedServiceRepositoryInterface',
      useClass: TourAccompaniedServiceRepository,
    },
    {
      provide: 'CruiseAccompaniedServiceRepositoryInterface',
      useClass: CruiseAccompaniedServiceRepository,
    },
  ],
})
export class AccompaniedServiceModule {}
