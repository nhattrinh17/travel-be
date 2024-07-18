import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PacketTourService } from './packet-tour.service';
import { CreatePacketTourDto } from './dto/create-packet-tour.dto';
import { UpdatePacketTourDto } from './dto/update-packet-tour.dto';
import { ApiOperationCustom, Pagination, PaginationDto } from 'src/custom-decorator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ApiDocsPagination } from 'src/setup-swagger';
import { Public } from '../auth/decorators';

@ApiTags('PacketTour')
@Controller('packet-tour')
export class PacketTourController {
  constructor(private readonly PacketTourService: PacketTourService) {}

  @Post()
  @ApiOperationCustom('PacketTour', 'post')
  async create(@Body() createPacketTourDto: CreatePacketTourDto) {
    try {
      return await this.PacketTourService.create(createPacketTourDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @Public()
  @ApiOperationCustom('PacketTour', 'get')
  findAll(@Pagination() pagination: PaginationDto, @Query('search') search) {
    return this.PacketTourService.findAll(pagination, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.PacketTourService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('PacketTour', 'patch')
  async update(@Param('id') id: string, @Body() updatePacketTourDto: UpdatePacketTourDto) {
    try {
      return await this.PacketTourService.update(+id, updatePacketTourDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperationCustom('PacketTour', 'delete')
  remove(@Param('id') id: string) {
    return this.PacketTourService.remove(+id);
  }
}
