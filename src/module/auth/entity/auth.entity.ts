
import { Token } from "src/services/token/entity/token.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";






// export type UserRoleType = "admin" | "editor" | "ghost"
export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string
    @Column({ nullable: true })
    password: string
    @Column({ nullable: true ,unique:true})
    email: string
    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role: Role
    @CreateDateColumn()
    createdAt:Date
    @UpdateDateColumn()
    updatedAt:Date


    @OneToMany(()=>Token,(token)=>token.user)
    token:Token
}