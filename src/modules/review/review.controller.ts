import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiOperationCustom, Pagination, PaginationDto } from 'src/custom-decorator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperationCustom('Review', 'post')
  async create(@Body() createReviewDto: CreateReviewDto) {
    try {
      return await this.reviewService.create(createReviewDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @Public()
  @ApiOperationCustom('Review', 'get')
  findAll(@Pagination() pagination: PaginationDto, @Query('cruiseId') cruiseId: number, @Query('tourId') tourId: number) {
    return this.reviewService.findAll(pagination, cruiseId, tourId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Review', 'patch')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    try {
      return await this.reviewService.update(+id, updateReviewDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperationCustom('Review', 'delete')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
