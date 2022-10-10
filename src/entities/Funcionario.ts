import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HoraExtra } from "./HoraExtra";
import { Sobreaviso } from "./Sobreaviso";

@Entity("funcionario")
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  phone: number;

  @Column({ type: "varchar", unique: true })
  matricula: string;

  @Column({ type: "varchar" })
  position: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "boolean" })
  isActive: boolean;

  @OneToMany(() => HoraExtra, (horaExtra) => horaExtra.id)
  horaExtra: Array<HoraExtra>;

  @OneToMany(() => Sobreaviso, (sobreaviso) => sobreaviso.id)
  sobreaviso: Array<Sobreaviso>;
}
