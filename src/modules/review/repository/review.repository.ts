import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { ReviewModel } from 'src/models';
import { ReviewRepositoryInterface } from '../interface/review.interface';
@Injectable()
export class ReviewRepository extends BaseRepositoryAbstract<ReviewModel> implements ReviewRepositoryInterface {
  constructor(@InjectModel(ReviewModel) private readonly reviewModel: typeof ReviewModel) {
    super(ReviewModel);
  }
}
