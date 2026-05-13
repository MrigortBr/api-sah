import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("user_login")
export abstract class UserLogin extends BaseEntity {
  @Column()
  id_user: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_user" })
  user: User;

  @Column({ type: "varchar" })
  ip_hash: string;

  @Column({ type: "varchar" })
  finger_print: string;

  @Column({
    type: "timestamp",
    default: () => "now() + interval '10 hours'",
  })
  expires_at: Date;
}
