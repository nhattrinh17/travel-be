import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiOperationCustom, BaseFilter, Pagination, PaginationDto } from 'src/custom-decorator';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiOperationCustom('Blog', 'post')
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get('cms')
  @BaseFilter()
  @ApiQuery({
    name: 'blogCategoryId',
  })
  @ApiOperationCustom('Blog', 'get')
  findAllForCMS(@Pagination() pagination: PaginationDto, @Query('blogCategoryId') blogCategoryId: number) {
    return this.blogService.findAllCMS(pagination, blogCategoryId);
  }

  @Get()
  @Public()
  @BaseFilter()
  @ApiQuery({
    name: 'blogCategoryId',
  })
  @ApiOperationCustom('Blog', 'get')
  findAll(@Pagination() pagination: PaginationDto, @Query('blogCategoryId') blogCategoryId: number, @Query('sort') sort: string, @Query('typeSort') typeSort: string) {
    return this.blogService.findAll(pagination, blogCategoryId, sort, typeSort);
  }

  @Get(':slug')
  @Public()
  @ApiOperationCustom('Blog', 'get', true, true)
  findOne(@Param('slug') slug: string) {
    return this.blogService.findOneBySlug(slug);
  }

  @Get(':slug/seo')
  @Public()
  @ApiOperationCustom('Blog', 'get', true, true)
  getDataSEO(@Param('slug') slug: string) {
    return this.blogService.findDataSEOBySlug(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Patch(':id/view')
  @Public()
  upView(@Param('id') id: string) {
    return this.blogService.upViewBlogById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
