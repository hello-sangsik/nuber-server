import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
class Place extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text"})
    name: string;

    @Column({type: "double precision", default: 0})
    lat;

    @Column({type: "double precision", default: 0})
    lng;

    @Column({type: "text"})
    address;

    @Column({type: "boolean", default: false})
    isFav;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

export default Place;