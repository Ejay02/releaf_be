import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dumpsite, DumpsiteDocument } from './dumpsite.schema';
import { CreateDumpsiteDto } from './dto/create-dumpsite.dto';

@Injectable()
export class DumpsiteService {
  constructor(
    @InjectModel(Dumpsite.name) private dumpsiteModel: Model<DumpsiteDocument>,
  ) {}

  async createDumpsite(
    createDumpsiteDto: CreateDumpsiteDto,
  ): Promise<Dumpsite> {
    try {
      const dumpsite = new this.dumpsiteModel(createDumpsiteDto);
      return await dumpsite.save();
    } catch (error) {
      throw new Error(`Error creating dumpsite: ${error.message}`);
    }
  }

  async updateDumpsite(
    id: string,
    updateDumpsiteDto: Partial<CreateDumpsiteDto>,
  ): Promise<Dumpsite> {
    try {
      const updatedDumpsite = await this.dumpsiteModel
        .findByIdAndUpdate(id, updateDumpsiteDto, { new: true })
        .exec();

      if (!updatedDumpsite) {
        throw new NotFoundException(`Dumpsite with ID ${id} not found`);
      }

      return updatedDumpsite;
    } catch (error) {
      throw new Error(`Error updating dumpsite: ${error.message}`);
    }
  }

  async getDumpsites(): Promise<Dumpsite[]> {
    try {
      return await this.dumpsiteModel.find().exec();
    } catch (error) {
      throw new NotFoundException(`Error fetching dumpsites: ${error.message}`);
    }
  }

  async getDumpsiteById(id: string): Promise<Dumpsite> {
    try {
      const dumpsite = await this.dumpsiteModel.findById(id).exec();
      if (!dumpsite) {
        throw new NotFoundException(`Dumpsite with ID ${id} not found`);
      }
      return dumpsite;
    } catch (error) {
      throw new NotFoundException(`Error fetching dumpsite: ${error.message}`);
    }
  }

  async deleteDumpsite(id: string): Promise<void> {
    try {
      const result = await this.dumpsiteModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Dumpsite with ID ${id} not found`);
      }
    } catch (error) {
      throw new Error(`Error deleting dumpsite: ${error.message}`);
    }
  }
}
