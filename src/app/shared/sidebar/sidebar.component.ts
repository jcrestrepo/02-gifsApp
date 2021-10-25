import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent  {

  get historial():string[] {
    return this.gifsServices.historial;
  }

  constructor( private gifsServices:GifsService) {
 
  }
  buscar(termino:string){
    this.gifsServices.buscarGifs(termino);
  }

}
