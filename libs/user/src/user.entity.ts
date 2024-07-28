import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  parentUserId: number;
}
