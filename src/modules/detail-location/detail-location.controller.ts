import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DetailLocationService } from './detail-location.service';
import { CreateDetailLocationDto } from './dto/create-detail-location.dto';
import { UpdateDetailLocationDto } from './dto/update-detail-location.dto';
import { ApiOperationCustom, Pagination, PaginationDto } from 'src/custom-decorator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ApiDocsPagination } from 'src/setup-swagger';
import { Public } from '../auth/decorators';

@ApiTags('DetailLocation')
@Controller('detail-location')
export class DetailLocationController {
  constructor(private readonly detailLocationService: DetailLocationService) {}

  @Post()
  @ApiOperationCustom('DetailLocation', 'post')
  async create(@Body() createDetailLocationDto: CreateDetailLocationDto) {
    try {
      return await this.detailLocationService.create(createDetailLocationDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @Public()
  @ApiOperationCustom('DetailLocation', 'get')
  findAll(@Pagination() pagination: PaginationDto, @Query('search') search) {
    return this.detailLocationService.findAll(pagination, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailLocationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('DetailLocation', 'patch')
  async update(@Param('id') id: string, @Body() updateDetailLocationDto: UpdateDetailLocationDto) {
    try {
      return await this.detailLocationService.update(+id, updateDetailLocationDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperationCustom('DetailLocation', 'delete')
  remove(@Param('id') id: string) {
    return this.detailLocationService.remove(+id);
  }
}
