import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("permission")
export abstract class Permission extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  cod: string;
}
