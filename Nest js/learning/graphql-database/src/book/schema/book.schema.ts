import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BookSchema {
    @Field((type) => Int)
    id: number;

    @Field((type) => String)
    title: string;

    @Field((type) => Int)
    price: number;
}