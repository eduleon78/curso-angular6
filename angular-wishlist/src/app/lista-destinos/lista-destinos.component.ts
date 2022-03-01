import { state } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { stat } from 'fs';
import { AppState } from '../app.module';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinosApiClient } from '../models/destinos-api-client.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../models/destinos-viajes-state.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onIntemAdded: EventEmitter<DestinoViaje>;
  updates: string[];

  constructor(private destinosApiClient:DestinosApiClient, private store: Storage<AppState) {
    this.onIntemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
      .subscribe(d => {
        if (d != null) {
          this.updates.push('Se ha elegido a ' + d.nombre);
        }
      });
    store.select(state = state.destinos.items).subscribe(items => this.all = items);
  }
  
  ngOnInit() {
  }

  agregado(d: DestinoViaje){
    this.destinosApiClient.add(d);
    this.onIntemAdded.emit(d);
  }

  elegido(e: DestinoViaje) {
    this.destinosApiClient.elegir(e);
  }

  getAll() {

  }
}
