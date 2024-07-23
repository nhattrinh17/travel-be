import { Inject, Injectable } from '@nestjs/common';
import { CreateDetailLocationDto } from './dto/create-detail-location.dto';
import { UpdateDetailLocationDto } from './dto/update-detail-location.dto';
import { DetailLocationRepositoryInterface } from './interface/detail-location.interface';
import { messageResponse } from 'src/constants';
import { generateSlug } from 'src/utils';
import { PaginationDto } from 'src/custom-decorator';
import { Op } from 'sequelize';
import { CruiseDetailLocationRepositoryInterface } from './interface/cruise-detail-location.interface';

@Injectable()
export class DetailLocationService {
  constructor(
    @Inject('DetailLocationRepositoryInterface')
    private readonly detailLocationRepository: DetailLocationRepositoryInterface,
    @Inject('CruiseDetailLocationRepositoryInterface')
    private readonly cruiseDetailLocationRepository: CruiseDetailLocationRepositoryInterface,
  ) {}

  async create(dto: CreateDetailLocationDto) {
    if (!dto.name || !dto.title || !dto.description || !dto.images) throw new Error(messageResponse.system.missingData);
    const slug = generateSlug(`${dto.name}`);
    const checkExit = await this.detailLocationRepository.count({ slug });
    if (checkExit) throw new Error(messageResponse.system.duplicateData);
    return this.detailLocationRepository.create({ ...dto, slug });
  }

  deleteCruiseDetailLocation(cruiseId: number) {
    return this.cruiseDetailLocationRepository.permanentlyDeleteByCondition({
      cruiseId,
    });
  }

  async addCruiseDetailLocation(cruiseId: number, detailLocationIds: number[]) {
    console.log('🚀 ~ DetailLocationService ~ addCruiseDetailLocation ~ detailLocationIds:', detailLocationIds);
    const checkSpecialOff = await Promise.all(detailLocationIds.map((id) => this.findOne(id)));
    if (checkSpecialOff.includes(null)) throw Error(messageResponse.accompaniedServiceId.idInvalid);
    return Promise.all(
      detailLocationIds.map((id) =>
        this.cruiseDetailLocationRepository.create({
          cruiseId,
          detailLocationId: id,
        }),
      ),
    );
  }

  findAll(pagination: PaginationDto, destinationId: number) {
    const filter: any = {};
    if (destinationId) filter.destinationId = destinationId;
    return this.detailLocationRepository.findAll(filter, {
      ...pagination,
      projection: ['id', 'name', 'description', 'title', 'images', 'createdAt'],
    });
  }

  findOne(id: number) {
    return this.detailLocationRepository.findOneById(id);
  }

  async update(id: number, dto: UpdateDetailLocationDto) {
    const DetailLocationById = await this.findOne(id);
    if (!DetailLocationById) throw new Error(messageResponse.system.idInvalid);
    const slug = generateSlug(`${dto.name}`);
    const checkExit = await this.detailLocationRepository.count({ slug, id: { [Op.ne]: id } });
    if (checkExit) throw new Error(messageResponse.system.duplicateData);
    return this.detailLocationRepository.findByIdAndUpdate(id, { ...dto, slug });
  }

  count(condition: object) {
    return this.detailLocationRepository.count(condition);
  }

  async remove(id: number) {
    const DetailLocation = await this.detailLocationRepository.count({ id: id });
    if (!DetailLocation) throw new Error(messageResponse.system.idInvalid);
    return this.detailLocationRepository.permanentlyDelete(id);
  }
}
