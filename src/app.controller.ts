import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Konyv } from './book';
import { CreateKonyvDto } from './createKonyv.dto';
import { UpdateKonyvDto } from './updateKonyv.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  konyvek: Konyv[] = [
    {
      id: 1,
      title: 'Egy könyv',
      author: 'Gyuszi',
      isbn: 'seéojh',
      publishYear: 1990,
      reserved: true,
    },
    {
      id: 2,
      title: 'Kettő könyv',
      author: 'Lajos',
      isbn: 'dtékoém',
      publishYear: 1990,
      reserved: true,
    },
    {
      id: 3,
      title: 'Három könyv',
      author: 'Gamesz',
      isbn: 'slkrkgsrji',
      publishYear: 1990,
      reserved: true,
    }
  ];
  nextId = 4

  @Get('books')
  konyvekListazas(){
    return this.konyvek;
  }

  @Get('books/:bookid')
  konyvIdAlapjan(@Param('bookid') id: string){
    const idSzam = parseInt(id);
    const konyv = this.konyvek.find(konyv => konyv.id == idSzam);

    if(!konyv){
      throw new NotFoundException("Nincs ilyen ID-jű könyv");
    }
    return konyv;
  }

  @Delete('books/:bookid')
  @HttpCode(204)
  konyvTorles(@Param('bookid') id: string){
    const idSzam = parseInt(id);
    const konyv = this.konyvek.findIndex(konyv => konyv.id == idSzam);
    
    this.konyvek.splice(konyv, 1);
  }

  @Post('ujKonyv')
  @HttpCode(201)
  ujKonyv(@Body() ujKonyvAdatok: CreateKonyvDto){
    const ujKonyv: Konyv = {
      ...ujKonyvAdatok,
      id: this.nextId,
      reserved: false,
    }
    this.nextId++;
    this.konyvek.push(ujKonyv)
    
    return ujKonyv;
  }

  @Patch('konyvModositas/:konyvid')
  @HttpCode(200)
  konyvModositas(@Param('konyvid') id: string, @Body() konyvAdatok: UpdateKonyvDto){
    const idSzam = parseInt(id);
    const eredetiKonyId = this.konyvek.findIndex(suti => suti.id == idSzam);
    const eredetiKonyv = this.konyvek[eredetiKonyId];

    const ujKonyv: Konyv = {
      ...eredetiKonyv,
      ...konyvAdatok,
    };

    this.konyvek[eredetiKonyId] = ujKonyv;
    return ujKonyv;
  }
}
