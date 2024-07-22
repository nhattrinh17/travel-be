import { Inject, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewRepositoryInterface } from './interface/review.interface';
import { messageResponse } from 'src/constants';
import { PaginationDto } from 'src/custom-decorator';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('ReviewRepositoryInterface')
    private readonly reviewRepository: ReviewRepositoryInterface,
  ) {}

  async create(dto: CreateReviewDto) {
    if ((!dto.cruiseId && !dto.tourId) || !dto.fullName || !dto.description) throw new Error(messageResponse.system.missingData);
    return this.reviewRepository.create({ ...dto });
  }

  findAll(pagination: PaginationDto, cruiseId: number, tourId: number) {
    const filter: any = {};
    if (cruiseId) filter.cruiseId = cruiseId;
    else if (tourId) filter.tourId = tourId;
    return this.reviewRepository.findAll(filter, {
      ...pagination,
      projection: ['id', 'date', 'fullName', 'image', 'star', 'description', 'title'],
    });
  }

  findOne(id: number) {
    return this.reviewRepository.findOneById(id);
  }

  async update(id: number, dto: UpdateReviewDto) {
    const ReviewById = await this.findOne(id);
    if (!ReviewById) throw new Error(messageResponse.system.idInvalid);

    return this.reviewRepository.findByIdAndUpdate(id, { ...dto });
  }

  count(condition: object) {
    return this.reviewRepository.count(condition);
  }

  async remove(id: number) {
    const Review = await this.reviewRepository.count({ id: id });
    if (!Review) throw new Error(messageResponse.system.idInvalid);
    return this.reviewRepository.permanentlyDelete(id);
  }
}
