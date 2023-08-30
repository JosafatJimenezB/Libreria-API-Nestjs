import { Book } from "src/book/entities/book.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('reservas')
export class Reserva {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'date', nullable: true })
    startDate: Date;

    @Column({ type: 'date', nullable: true })
    endDate: Date;

    @Column({ type: 'boolean', default: false })
    confirmed: boolean;

    @ManyToOne(() => Book)
    @JoinColumn({ name: 'bookId' })
    book: Book;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}
