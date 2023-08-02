import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomRequest } from '../models/model';
import { GeneralConstants } from '../constantes/genealConstantes';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private API_KEY: string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(
    private http: HttpClient,
    public toastr: ToastrService) { }

  /**Metodo para hacer peticiones**/
  generalRequest(request: CustomRequest): Observable<any> {
    return this.http.request(request.method, request.url, {
      body: request.body,
      headers: request.headers,
      params: request.params
    });
  }

  // Obtener la lista completa de Pokémon
  obtenerPokemones(): Observable<any> {
    const request: CustomRequest = {
      method: 'GET',
      url: `${this.API_KEY}?limit=30`, // Limitamos a 30
    };
    return this.generalRequest(request);
  }

  // Obtener los detalles de un Pokémon por su nombre
  obtenerdetallesPokemon(name: string): Observable<any> {
    const request: CustomRequest = {
      method: 'GET',
      url: `${this.API_KEY}${name}`,
    };
    return this.generalRequest(request);
  }

  /**Aqui notificaciones por tooltip**/
  mostarToastTiempo(tipo: number, titulo: string, descripcion: (string | undefined), tiempo: number, posicion: string) {
    switch (tipo) {
      case GeneralConstants.TOAST_TIPO_SUCCESS:
        this.toastr.success(descripcion, titulo, { timeOut: tiempo, progressBar: true, positionClass: posicion });
        break;
      case GeneralConstants.TOAST_TIPO_INFO:
        this.toastr.info(descripcion, titulo, { timeOut: tiempo, progressBar: true, positionClass: posicion });
        break;
      case GeneralConstants.TOAST_TIPO_WARNING:
        this.toastr.warning(descripcion, titulo, { timeOut: tiempo, progressBar: true, positionClass: posicion });
        break;
      case GeneralConstants.TOAST_TIPO_ERROR:
        this.toastr.error(descripcion, titulo, { timeOut: tiempo, progressBar: true, positionClass: posicion });
        break;
      default:
        break;
    }
  }
}