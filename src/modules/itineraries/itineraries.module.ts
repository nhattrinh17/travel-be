import { Module } from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
// import { ItinerariesController } from './itineraries.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItinerariesModel } from 'src/models';
import { ItinerariesRepository } from './repository/itineraries.repository';

@Module({
  imports: [SequelizeModule.forFeature([ItinerariesModel])],
  // controllers: [ItinerariesController],
  providers: [
    ItinerariesService,
    {
      provide: 'ItinerariesRepositoryInterface',
      useClass: ItinerariesRepository,
    },
  ],
  exports: [
    ItinerariesService,
    {
      provide: 'ItinerariesRepositoryInterface',
      useClass: ItinerariesRepository,
    },
  ],
})
export class ItinerariesModule {}
