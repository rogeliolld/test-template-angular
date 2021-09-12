import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';
import { ProductosService } from '../../services/productos.service';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion = {};
  id = '';

  constructor( private route: ActivatedRoute, 
               public productoService: ProductosService,
               public _servicio: InfoPaginaService
    ) { }

  ngOnInit(): void {

    this.route.params
    .subscribe(parametros =>{
      this.productoService.getProducto(parametros['id'])
        .subscribe( (producto: ProductoDescripcion) =>{
          this.id = parametros['id'];
          this.producto = producto
        });
      
    })

  }

}
