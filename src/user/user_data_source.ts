import { Service } from "typedi";
import { BaseDataSource } from "../core/base_data_source";
import { User, UserSchema } from "./user";

@Service()
export class UserDataSource extends BaseDataSource<User>{
    constructor() {
        super(UserSchema, User.name);
    }

    async getAll(): Promise<User[]>{
        console.log("injection working fine");
        return await super.getAll();
    }

    async findByEmail(email: string): Promise<User> {
        return await this.findOne({email : email});
    }
}
