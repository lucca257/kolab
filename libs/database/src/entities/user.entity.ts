import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  parentUserId: number | null;

  @OneToMany(() => User, user => user.parent)
  children: User[];

  @ManyToOne(() => User, user => user.children)
  parent: User;
}
