import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Funcionario } from "./Funcionario";

@Entity("hora-extra")
export class HoraExtra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  entrada: string;

  @Column({ type: "varchar" })
  saida: string;

  @Column({ type: "boolean" })
  isApproved: boolean;

  @Column({ type: "varchar" })
  description: string;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.id)
  @JoinColumn({ name: "id" })
  funcionario: Funcionario;
}
