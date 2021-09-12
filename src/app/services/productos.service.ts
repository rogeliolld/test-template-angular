import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';
import { Producto } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: any = [];
  productoFiltrado: Producto[] = [];


  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

   public cargarProductos(){

      return new Promise<void>( (resolve, reject) => {
        
        this.http.get<Producto>('https://angular-html-f705f-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe( resp => {
         this.productos = resp;
         this.cargando = false;
         resolve();
       });

      });

   }


   getProducto ( id:string){
     return this.http.get<ProductoDescripcion>(`https://angular-html-f705f-default-rtdb.firebaseio.com/productos/${id}.json`);
   }

   buscarProducto(termino:string){

    if(this.productos.length===0){
      //cargar Productos
      this.cargarProductos().then( ()=>{
        //ejecutar despues de tener los productos
        //aplicar Filtro
        this.filtrarProductos(termino);
      })
    }else{
      //aplicar Filtro
        this.filtrarProductos(termino);
    }
  
   }

   private filtrarProductos (termino:string){
     this.productoFiltrado=[];
      termino = termino.toLocaleLowerCase();//pasamoa a minuscula el termino
      this.productos.forEach( (prod: Producto) => {
        const tituloLower = prod.titulo.toLocaleLowerCase(); //convertimos a minuscula el titulo
          if(prod.categoria.indexOf(termino) >=0  || tituloLower.indexOf(termino) >=0 ){
            this.productoFiltrado.push(prod)
          }
      });
   }
}
