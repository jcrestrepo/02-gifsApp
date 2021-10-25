import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apikey    :string='hdXmz9yUNe18GXqfa2zhnKHKgw9JMXJb';
  private servicioUrl :string="https://api.giphy.com/v1/gifs";
  private _historial:string[]=[];
  
  //TODO cambiar el tipo de ANY
  public resultados:Gif[]=[];

  public get historial() : string[] {
    
    return [...this._historial];
  }

  /**
   * Declaracion del Constructor
   */
  constructor( private http:HttpClient) {
    if(localStorage.getItem('historial')){

      this._historial= JSON.parse(localStorage.getItem('historial')!); 

    }
    if(localStorage.getItem('resultados')){

      this.resultados= JSON.parse(localStorage.getItem('resultados')!); 

    }

   
  }

  buscarGifs(query:string){

    query=query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }
    const params =new HttpParams()
      .set("api_key", this.apikey)
      .set("q", query)
      .set("limit", "30");
      
    
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search?`,{params:params}) 
      .subscribe( (resp) =>{
        this.resultados=resp.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados));
      });   

      
 
  }
  
}
