import {IsString, IsOptional, IsBoolean, IsIn, IsArray} from 'class-validator';
export class CreateTodoDto{
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsIn(['low', 'medium', 'high'])
    priority?: 'low' | 'medium' | 'high';

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsBoolean()
    isFavorite?: boolean = false;
}