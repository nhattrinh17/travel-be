import { Inject, Injectable } from '@nestjs/common';
import { CreatePacketTourDto } from './dto/create-packet-tour.dto';
import { UpdatePacketTourDto } from './dto/update-packet-tour.dto';
import { PacketTourRepositoryInterface } from './interface/packet-tour.interface';
import { messageResponse } from 'src/constants';
import { generateSlug } from 'src/utils';
import { PaginationDto } from 'src/custom-decorator';
import { Op } from 'sequelize';

@Injectable()
export class PacketTourService {
  constructor(
    @Inject('PacketTourRepositoryInterface')
    private readonly packetTourRepository: PacketTourRepositoryInterface,
  ) {}

  async create(dto: CreatePacketTourDto) {
    if (!dto.name || !dto.image || !dto.title) throw new Error(messageResponse.system.missingData);
    const slug = generateSlug(`${dto.name}`);
    const checkExit = await this.packetTourRepository.count({ slug });
    if (checkExit) throw new Error(messageResponse.system.duplicateData);
    return this.packetTourRepository.create({ ...dto, slug });
  }

  findAll(pagination: PaginationDto, search: string) {
    const filter: any = {};
    if (search) filter.province = { [Op.like]: search };
    return this.packetTourRepository.findAll(filter, {
      ...pagination,
      projection: ['id', 'name', 'image', 'title', 'createdAt'],
    });
  }

  findOne(id: number) {
    return this.packetTourRepository.findOneById(id);
  }

  async update(id: number, dto: UpdatePacketTourDto) {
    const PacketTourById = await this.findOne(id);
    if (!PacketTourById) throw new Error(messageResponse.system.idInvalid);
    const slug = generateSlug(`${dto.name}`);
    const checkExit = await this.packetTourRepository.count({ slug, id: { [Op.ne]: id } });
    if (checkExit) throw new Error(messageResponse.system.duplicateData);
    return this.packetTourRepository.findByIdAndUpdate(id, { ...dto, slug });
  }

  count(condition: object) {
    return this.packetTourRepository.count(condition);
  }

  async remove(id: number) {
    const PacketTour = await this.packetTourRepository.count({ id: id });
    if (!PacketTour) throw new Error(messageResponse.system.idInvalid);
    return this.packetTourRepository.permanentlyDelete(id);
  }
}
