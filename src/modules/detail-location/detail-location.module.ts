import { Module } from '@nestjs/common';
import { DetailLocationService } from './detail-location.service';
import { DetailLocationController } from './detail-location.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CruiseDetailLocationModel, DetailLocationModel } from 'src/models';
import { DetailLocationRepository } from './repository/detail-location.repository';
import { CruiseDetailLocationRepository } from './repository/cruise-detail-location.repository';

@Module({
  imports: [SequelizeModule.forFeature([DetailLocationModel, CruiseDetailLocationModel])],
  controllers: [DetailLocationController],
  providers: [
    DetailLocationService,
    {
      provide: 'DetailLocationRepositoryInterface',
      useClass: DetailLocationRepository,
    },
    {
      provide: 'CruiseDetailLocationRepositoryInterface',
      useClass: CruiseDetailLocationRepository,
    },
  ],
  exports: [
    DetailLocationService,
    {
      provide: 'DetailLocationRepositoryInterface',
      useClass: DetailLocationRepository,
    },
    {
      provide: 'CruiseDetailLocationRepositoryInterface',
      useClass: CruiseDetailLocationRepository,
    },
  ],
})
export class DetailLocationModule {}
