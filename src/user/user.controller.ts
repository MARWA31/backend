import { Get, JsonController, Post,Put ,Delete, Param, Body, Req, Res } from "routing-controllers";
import { User } from "./user";
import { UserService } from "./user_service";
import Container, { Inject } from "typedi";

@JsonController("/user") 
export class UserController {
    private userService: UserService = Container.get(UserService)
    constructor(){}
    private users: User[] = [];
    
    @Get("/")
    getAllUsers(): User[] { 

        return this.users;
    }

    @Get("/:id")
    getUser(@Param("id") id: String): User | undefined {
        return this.users.find((user) => user.id === id);
    }

    @Post("/login")
    async login(@Body() user: User): Promise<User> {
        let tets = 1 + 1;
        let logginUser = await this.userService.login(user);
        logginUser  = new User("'i","fsf","emaikl")
        return logginUser;
    }

    @Post("/")
    createUser(@Body() user: User): User {
        user.id = "id";
        this.users.push(user);
        return user;
    }

    @Put("/:id")
    updateUser(@Param("id") id: String, @Body() updatedUser: User): User | undefined {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
            return this.users[userIndex];
        }
        return undefined;
    }

    @Delete("/:id")
    deleteUser(@Param("id") id: String): void {
        this.users = this.users.filter((user) => user.id !== id);
    }
}