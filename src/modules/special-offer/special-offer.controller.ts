import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { SpecialOfferService } from './special-offer.service';
import { CreateSpecialOfferDto } from './dto/create-special-offer.dto';
import { UpdateSpecialOfferDto } from './dto/update-special-offer.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter, Pagination, PaginationDto } from 'src/custom-decorator';

@ApiTags('Special Offer')
@Controller('special-offer')
export class SpecialOfferController {
  constructor(private readonly specialOfferService: SpecialOfferService) {}

  @Post()
  @ApiOperationCustom('Special Offer', 'post')
  async create(@Body() createSpecialOfferDto: CreateSpecialOfferDto) {
    try {
      return await this.specialOfferService.create(createSpecialOfferDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @BaseFilter()
  @ApiOperationCustom('Special Offer', 'get')
  findAll(@Pagination() pagination: PaginationDto, @Query('search') search: string) {
    return this.specialOfferService.findAll(search, pagination);
  }

  @Get(':id')
  @ApiOperationCustom('Special Offer', 'post', true, true)
  findOne(@Param('id') id: string) {
    return this.specialOfferService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Special Offer', 'patch')
  async update(@Param('id') id: string, @Body() updateSpecialOfferDto: UpdateSpecialOfferDto) {
    try {
      return await this.specialOfferService.update(+id, updateSpecialOfferDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
