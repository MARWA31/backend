import { BaseDataSource } from "../core/base_data_source";
import { User, UserSchema } from "./user";

export class UserDataSource extends BaseDataSource<User>{
    constructor() {
        super(UserSchema, User.name);
    }
}