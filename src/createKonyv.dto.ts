import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateKonyvDto{
    @IsString({message: 'A nevet kötelező megadni'})
    title: string;

    @IsString({message: 'A szerzőt kötelező megadni'})
    author: string;
    
    @IsString({message: 'Az isbn-t kötelező megadni'})
    isbn: string;
    
    @IsInt({message: 'A kiadás dátumát kötelező megadni'})
    publishYear: number;
}