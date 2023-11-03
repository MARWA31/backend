import Container, { Inject, Service } from "typedi";
import { User } from "./user";
import { UserDataSource } from "./user_data_source";
import { execPath } from "process";

@Service()
export class UserService{
    private userDataSource: UserDataSource = Container.get(UserDataSource)

    constructor(){}

    public async login(user :User){
        let savedUser : User ;
        savedUser = await this.userDataSource.findByEmail(user.email);
        if(!savedUser){
            throw Error("User don't exist, please create account")
        } 
        else{
            // perform login
            let generatedToken = ""
            savedUser.token = generatedToken;
        }

        return savedUser;
    }
}
