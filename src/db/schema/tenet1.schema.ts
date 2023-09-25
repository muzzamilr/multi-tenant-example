import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tenant1", { schema: "tenant1" })
export class Tenant1 {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: number;

  @Column()
  age!: number;
}
