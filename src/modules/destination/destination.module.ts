import { Module } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DestinationModel } from 'src/models';
import { DestinationRepository } from './repository/destination.repository';

@Module({
  imports: [SequelizeModule.forFeature([DestinationModel])],
  controllers: [DestinationController],
  providers: [
    DestinationService,
    {
      provide: 'DestinationRepositoryInterface',
      useClass: DestinationRepository,
    },
  ],
  exports: [
    DestinationService,
    {
      provide: 'DestinationRepositoryInterface',
      useClass: DestinationRepository,
    },
  ],
})
export class DestinationModule {}
