import { Inject, Injectable } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { DestinationRepositoryInterface } from './interface/destination.interface';
import { messageResponse } from 'src/constants';
import { generateSlug } from 'src/utils';
import { PaginationDto } from 'src/custom-decorator';
import { Op } from 'sequelize';
import { DetailLocationModel } from 'src/models';

@Injectable()
export class DestinationService {
  constructor(
    @Inject('DestinationRepositoryInterface')
    private readonly destinationRepository: DestinationRepositoryInterface,
  ) {}

  async create(dto: CreateDestinationDto) {
    if (!dto.name || !dto.title || !dto.description || !dto.image) throw new Error(messageResponse.system.missingData);
    const slug = generateSlug(`${dto.name}`);
    const checkExit = await this.destinationRepository.count({ slug });
    if (checkExit) throw new Error(messageResponse.system.duplicateData);
    return this.destinationRepository.create({ ...dto, slug });
  }

  findAll(pagination: PaginationDto, seeDetail: string) {
    const filter: any = {};
    // if (search) filter.province = { [Op.like]: search };
    return this.destinationRepository.findAll(filter, {
      ...pagination,
      projection: ['id', 'name', 'title', 'description', 'slug', 'image', 'createdAt'],
      include: seeDetail
        ? [
            {
              //
              model: DetailLocationModel,
              as: 'detailLocations',
              attributes: ['name', 'slug', 'id', 'description', 'images', 'title'],
            },
          ]
        : [],
    });
  }

  findOne(id: number) {
    return this.destinationRepository.findOneById(id);
  }

  async update(id: number, dto: UpdateDestinationDto) {
    const DestinationById = await this.findOne(id);
    if (!DestinationById) throw new Error(messageResponse.system.idInvalid);
    const slug = generateSlug(`${dto.name}`);
    const checkExit = await this.destinationRepository.count({ slug, id: { [Op.ne]: id } });
    if (checkExit) throw new Error(messageResponse.system.duplicateData);
    return this.destinationRepository.findByIdAndUpdate(id, { ...dto, slug });
  }

  count(condition: object) {
    return this.destinationRepository.count(condition);
  }

  async remove(id: number) {
    const Destination = await this.destinationRepository.count({ id: id });
    if (!Destination) throw new Error(messageResponse.system.idInvalid);
    return this.destinationRepository.permanentlyDelete(id);
  }
}
