import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DumpsiteController } from './dumpsite.controller';
import { DumpsiteService } from './dumpsite.service';
import { Dumpsite, DumpsiteSchema } from './dumpsite.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dumpsite.name, schema: DumpsiteSchema },
    ]),
  ],
  controllers: [DumpsiteController],
  providers: [DumpsiteService],
})
export class DumpsiteModule {}
