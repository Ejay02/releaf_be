import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DumpsiteService } from './dumpsite.service';
import { CreateDumpsiteDto } from './dto/create-dumpsite.dto';
import { JwtAuthGuard } from 'src/user/jwt/jwt-auth.guard';

@ApiTags('Dumpsites')
@Controller('dumpsites')
export class DumpsiteController {
  constructor(private readonly dumpsiteService: DumpsiteService) {}

  @ApiOperation({ summary: 'Create a new dumpsite' })
  @ApiResponse({
    status: 201,
    description: 'The dumpsite has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createDumpsite(@Body() createDumpsiteDto: CreateDumpsiteDto) {
    return this.dumpsiteService.createDumpsite(createDumpsiteDto);
  }

  @ApiOperation({ summary: 'Retrieve all dumpsites' })
  @ApiResponse({
    status: 200,
    description: 'List of dumpsites retrieved successfully.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getDumpsites() {
    return this.dumpsiteService.getDumpsites();
  }

  @ApiOperation({ summary: 'Retrieve a dumpsite by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the dumpsite', type: String })
  @ApiResponse({ status: 200, description: 'Dumpsite retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Dumpsite not found.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getDumpsiteById(@Param('id') id: string) {
    return this.dumpsiteService.getDumpsiteById(id);
  }

  @ApiOperation({ summary: 'Update a dumpsite' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the dumpsite to update',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Dumpsite updated successfully.' })
  @ApiResponse({ status: 404, description: 'Dumpsite not found.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateDumpsite(
    @Param('id') id: string,
    @Body() createDumpsiteDto: CreateDumpsiteDto,
  ) {
    return this.dumpsiteService.updateDumpsite(id, createDumpsiteDto);
  }

  @ApiOperation({ summary: 'Delete a dumpsite' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the dumpsite to delete',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Dumpsite deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Dumpsite not found.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async deleteDumpsite(@Param('id') id: string) {
    return this.dumpsiteService.deleteDumpsite(id);
  }
}
