import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Funcionario } from "./Funcionario";

@Entity("sobreaviso")
export class Sobreaviso {
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