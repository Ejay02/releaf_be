import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MillService } from './mill.service';
import { JwtAuthGuard } from 'src/user/jwt/jwt-auth.guard';

@ApiTags('Mills') // Groups all endpoints under 'Mills' in Swagger UI
@Controller('mills')
export class MillController {
  constructor(private readonly millService: MillService) {}

  @ApiOperation({ summary: 'Retrieve all mills' })
  @ApiResponse({
    status: 200,
    description: 'List of mills retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'No mills found.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getMills() {
    return this.millService.getMills();
  }

  @ApiOperation({ summary: 'Retrieve a mill by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the mill', type: String })
  @ApiResponse({ status: 200, description: 'Mill retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Mill not found.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMillById(@Param('id') id: string) {
    return this.millService.getMillById(id);
  }
}
