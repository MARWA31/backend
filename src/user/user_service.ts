import { User } from "./user";
import { UserDataSource } from "./user_data_source";

export class UserService{
    private userDataSource : UserDataSource = new UserDataSource(); 
    constructor(){}

    public async login(user :User){

        if("mrawa" == user.name){
            throw Error("3omerek ma tet3ada")
        }
        await this.userDataSource.add(user);
    }
}