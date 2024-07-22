import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewModel } from 'src/models';
import { ReviewRepository } from './repository/review.repository';

@Module({
  imports: [SequelizeModule.forFeature([ReviewModel])],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    {
      provide: 'ReviewRepositoryInterface',
      useClass: ReviewRepository,
    },
  ],
  exports: [
    ReviewService,
    {
      provide: 'ReviewRepositoryInterface',
      useClass: ReviewRepository,
    },
  ],
})
export class ReviewModule {}
