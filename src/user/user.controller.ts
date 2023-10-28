import { Get, JsonController, Post,Put ,Delete, Param, Body } from "routing-controllers";
import { User } from "./user";
import { UserService } from "./user_service";

@JsonController("/user") 
export class UserController {
    private userService: UserService = new UserService();
    private users: User[] = []; // Utilisation simplifiée pour stocker les utilisateurs en mémoire

    
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
        await this.userService.login(user);
        return user;
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