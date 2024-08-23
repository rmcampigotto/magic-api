import { Role } from "src/auth/roles/enums/roles.enum";

export class CreateUserDto {
    id: Number;
    username: String;
    password: string;
    roles: Array<Role>;
}