import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mill, MillDocument } from './mill.schema';

@Injectable()
export class MillService {
  constructor(@InjectModel(Mill.name) private millModel: Model<MillDocument>) {}

  async getMills(): Promise<Mill[]> {
    try {
      return this.millModel.find().exec();
    } catch (error) {
      throw new NotFoundException('Error fetching mills: ' + error.message);
    }
  }

  async getMillById(id: string): Promise<Mill> {
    try {
      const mill = await this.millModel.findById(id).exec();
      if (!mill) {
        throw new NotFoundException(`Mill with ID ${id} not found`);
      }
      return mill;
    } catch (error) {
      throw new NotFoundException('Error fetching mill: ' + error.message);
    }
  }
}
