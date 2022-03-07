import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';


@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onIntemAdded: EventEmitter<DestinoViaje>;
  updates: string[];

  constructor(
    private destinosApiClient:DestinosApiClient, 
    private store: Store: <AppState>
    ) {
    this.onIntemAdded = new EventEmitter();
    this.updates = [];

  }
  
  ngOnInit() {
    this.store.select(state => state.destinos.favorito)
      .subscribe(data => {
        const f = data;
        if (f != null) {
          this.updates.push('Se ha elegido a ' + f.nombre);
        }
      });
  }

  agregado(d: DestinoViaje): void{
    this.destinosApiClient.add(d);
    //this.onIntemAdded.emit(d);
  }

  elegido(d: DestinoViaje): void {
    this.destinosApiClient.elegir(d);
  }

  getAll() {

  }
}
