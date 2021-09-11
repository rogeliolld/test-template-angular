import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  public productos: any = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

   public cargarProductos(){

     this.http.get<Producto>('https://angular-html-f705f-default-rtdb.firebaseio.com/productos_idx.json')
     .subscribe( resp => {
       
      this.productos = resp;
      this.cargando = false;

    })
   }
}
