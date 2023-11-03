import mongoose from "mongoose";
import { IBaseDataSource } from "./ibase_data_source";

export class BaseDataSource<T> implements IBaseDataSource<T> {
    private model: mongoose.Model<T & mongoose.Document>;

    constructor(schema: mongoose.Schema, collection: string) {
        this.model = mongoose.model<T & mongoose.Document>(collection, schema);
      }
      
    async add(entity: T): Promise<T> {
        return (await this.model.create(entity))?.toObject();
    }

    async update(query: any, entity: T): Promise<T> {
        return (
            await this.model.findOneAndUpdate(query, entity, { new: true }).exec()
          )?.toObject();    
    }

    async findById(id: string): Promise<T> {
        return (await this.model.findById(id).exec())?.toObject();
    }

    async findOne(query: any): Promise<T> {
        return (await this.model.findOne(query).exec())?.toObject();
    }

    async getAll(): Promise<T[]> {
        let array: mongoose.Document<T>[] = await this.model.find().exec();
        return array.map((item) => item.toObject());
    }

    async query(filter: any): Promise<T[]> {
        let array: mongoose.Document<T>[] = await this.model.find(filter).exec();
        return array.map((item) => item.toObject());    
    }

    async count(): Promise<number> {
        const count = await this.model.countDocuments();
        return count;   
    }

    dispose(): void {
        
    }
}