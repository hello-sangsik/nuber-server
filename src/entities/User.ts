import bcrypt from "bcrypt";
import {IsEmail} from "class-validator";
import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import Chat from "./Chat";
import Message from "./Message";
import Ride from "./Ride";
import Verification from "./Verification";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsEmail()
    @Column({type: "text", unique: true})
    email: string;

    @Column({type: "boolean", default: false})
    verifiedEmail: boolean;

    @Column({type: "text"})
    firstName: string;

    @Column({type: "text"})
    lastName: string;

    @Column({type: "int"})
    age: number;

    @Column({type: "text"})
    password: string;

    @Column({type: "text"})
    phoneNumber: string;

    @Column({type: "boolean"})
    verifiedPhoneNumber: boolean;

    @Column({type: "text"})
    profilePhoto: string;

    @Column({type: "boolean", default: false})
    isDriving: boolean;

    @Column({type: "boolean", default: false})
    isRiding: boolean;

    @Column({type: "boolean", default: false})
    isTaken: boolean;

    @Column({type: "double precision", default: 0})
    lastLng: number;

    @Column({type: "double precision", default: 0})
    lastLat: number;

    @Column({type: "double precision", default: 0})
    lastOrientation: number;

    @ManyToOne(type => Chat, chat => chat.participants)
    chat: Chat;

    @OneToMany(type => Message, message => message.user)
    messages: Message[];

    @OneToMany(type => Verification, verification => verification.user)
    verification: Verification[];

    @OneToMany(type => Ride, ride => ride.passenger)
    ridesAsPassenger: Ride[];

    @OneToMany(type => Ride, ride => ride.driver)
    ridesAsDriver: Ride[];

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }

    public comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async savePassword(): Promise<void> {
        if (this.password) {
            this.password = await this.hashPassword(this.password);
        }
    }

    private hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, BCRYPT_ROUNDS);
    }
}

export default User;