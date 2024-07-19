import { Inject, Injectable } from '@nestjs/common';
import { CreateDetailLocationDto } from './dto/create-detail-location.dto';
import { UpdateDetailLocationDto } from './dto/update-detail-location.dto';
import { DetailLocationRepositoryInterface } from './interface/detail-location.interface';
import { messageResponse } from 'src/constants';
import { generateSlug } from 'src/utils';
import { PaginationDto } from 'src/custom-decorator';
import { Op } from 'sequelize';

@Injectable()
export class DetailLocationService {
  constructor(
    @Inject('DetailLocationRepositoryInterface')
    private readonly DetailLocationRepository: DetailLocationRepositoryInterface,
  ) {}

  async create(dto: CreateDetailLocationDto) {
    if (!dto.name || !dto.title || !dto.description || !dto.images) throw new Error(messageResponse.system.missingData);
    const slug = generateSlug(`${dto.name}`);
    const checkExit = await this.DetailLocationRepository.count({ slug });
    if (checkExit) throw new Error(messageResponse.system.duplicateData);
    return this.DetailLocationRepository.create({ ...dto, slug });
  }

  findAll(pagination: PaginationDto, idDestination: number) {
    const filter: any = {};
    if (idDestination) filter.idDestination = { [Op.like]: idDestination };
    return this.DetailLocationRepository.findAll(filter, {
      ...pagination,
      projection: ['id', 'name', 'description', 'title', 'images', 'createdAt'],
    });
  }

  findOne(id: number) {
    return this.DetailLocationRepository.findOneById(id);
  }

  async update(id: number, dto: UpdateDetailLocationDto) {
    const DetailLocationById = await this.findOne(id);
    if (!DetailLocationById) throw new Error(messageResponse.system.idInvalid);
    const slug = generateSlug(`${dto.name}`);
    const checkExit = await this.DetailLocationRepository.count({ slug, id: { [Op.ne]: id } });
    if (checkExit) throw new Error(messageResponse.system.duplicateData);
    return this.DetailLocationRepository.findByIdAndUpdate(id, { ...dto, slug });
  }

  count(condition: object) {
    return this.DetailLocationRepository.count(condition);
  }

  async remove(id: number) {
    const DetailLocation = await this.DetailLocationRepository.count({ id: id });
    if (!DetailLocation) throw new Error(messageResponse.system.idInvalid);
    return this.DetailLocationRepository.permanentlyDelete(id);
  }
}
