import { Module } from '@nestjs/common';
import { DetailLocationService } from './detail-location.service';
import { DetailLocationController } from './detail-location.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DetailLocationModel } from 'src/models';
import { DetailLocationRepository } from './repository/detail-location.repository';

@Module({
  imports: [SequelizeModule.forFeature([DetailLocationModel])],
  controllers: [DetailLocationController],
  providers: [
    DetailLocationService,
    {
      provide: 'DetailLocationRepositoryInterface',
      useClass: DetailLocationRepository,
    },
  ],
  exports: [
    DetailLocationService,
    {
      provide: 'DetailLocationRepositoryInterface',
      useClass: DetailLocationRepository,
    },
  ],
})
export class DetailLocationModule {}
