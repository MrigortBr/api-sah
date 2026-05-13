import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Permission } from "./Permission";

@Entity("user")
export abstract class User extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: false })
  position: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false, default: false })
  emailVerified: boolean;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => Permission)
  @JoinColumn({ name: "id_permission" })
  permission: Permission;
}
