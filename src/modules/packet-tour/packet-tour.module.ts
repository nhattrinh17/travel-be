import { Module } from '@nestjs/common';
import { PacketTourService } from './packet-tour.service';
import { PacketTourController } from './packet-tour.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PacketTourModel } from 'src/models';
import { PacketTourRepository } from './repository/packet-tour.repository';

@Module({
  imports: [SequelizeModule.forFeature([PacketTourModel])],
  controllers: [PacketTourController],
  providers: [
    PacketTourService,
    {
      provide: 'PacketTourRepositoryInterface',
      useClass: PacketTourRepository,
    },
  ],
  exports: [
    PacketTourService,
    {
      provide: 'PacketTourRepositoryInterface',
      useClass: PacketTourRepository,
    },
  ],
})
export class PacketTourModule {}
