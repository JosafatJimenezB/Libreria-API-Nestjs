import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'books' })
export class Book {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    title: string

    @Column()
    genre: string

    @Column()
    description: string

    @Column()
    author: string

    @Column()
    publisher: string

    @Column()
    pages: number

    @Column()
    image_url: string
}
