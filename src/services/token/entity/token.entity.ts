import { User } from "src/module/auth/entity/auth.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "token" })
export class Token {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        nullable: false
    })
    code: string

    @Column({
        nullable: false
    })
    subject: string

    @Column({ type: 'timestamp' })
    expiry: Date

    @CreateDateColumn()
    createdAt: Date

    @CreateDateColumn()
    updatedAt: Date

    @ManyToOne(()=>User,(user)=>user.tokens)
    user:User

}