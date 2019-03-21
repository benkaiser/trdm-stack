import {
  Entity,
  PrimaryColumn,
  Column
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryColumn({ type: "bigint" })
  id: string;

  @Column()
  username: string;

  @Column({ charset: "utf8" })
  fullname: string;

  @Column()
  profilePicUrl: string;
}