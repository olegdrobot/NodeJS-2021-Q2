import { CreateMyColumnDto } from './create-mycolumn.dto ';

export class CreateBoardDto {
  id: string;
  title: string;
  columns: CreateMyColumnDto[];
}
