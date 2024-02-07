export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
}

export interface UserCreate {
    name: string;
    email: string;
    password: string;
}

export interface UserView {
    email: string;
}

export interface UserUpdate {
    name: string;
    email: string;
    password: string;
    id: number;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRepository {
    create(data: UserCreate): Promise<User>
    update(id: number, data: UserUpdate): Promise<User>
}