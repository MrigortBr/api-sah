import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";

@Entity("user_reset")
export class UserReset extends BaseEntity {
  @Column()
  id_user: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_user" })
  user: User;

  @Column({ type: "boolean", default: true })
  is_avaliable: boolean;

  @Column({ type: "varchar" })
  token: string;

  @Column({
    type: "timestamp",
    default: () => "now() + interval '1 hours'",
  })
  expires_at: Date;
}
