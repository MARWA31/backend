import { Get, JsonController, Post,Put ,Delete, Param, Body } from "routing-controllers";
import { User } from "./user";

@JsonController("/user") 
export class UserController {
    private users: User[] = []; // Utilisation simplifiée pour stocker les utilisateurs en mémoire

    
    @Get("/")
    getAllUsers(): User[] {
        return this.users;
    }

    @Get("/:id")
    getUser(@Param("id") id: number): User | undefined {
        return this.users.find((user) => user.id === id);
    }

    @Post("/")
    createUser(@Body() user: User): User {
        user.id = this.users.length + 1;
        this.users.push(user);
        return user;
    }

    @Put("/:id")
    updateUser(@Param("id") id: number, @Body() updatedUser: User): User | undefined {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
            return this.users[userIndex];
        }
        return undefined;
    }

    @Delete("/:id")
    deleteUser(@Param("id") id: number): void {
        this.users = this.users.filter((user) => user.id !== id);
    }
}