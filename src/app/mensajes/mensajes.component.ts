import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  pokemons: any[] = [];
  itemsPerPage: number = 20;
  paginatedPokemons: any[] = [];
  currentYear: number = 0;

  constructor(
    private sharedService: SharedService,
    private router: Router,
  ) {

    this.currentYear = new Date().getFullYear();
  }
  /** Aqui invocamos estas dos funciones al cargar el componente **/
  ngOnInit(): void {
    this.obternerPokemons();
    this.typingEffect();
  }

  /**Aqui consumimos el recurso Obtener Pokemones**/
  obternerPokemons(): void {
    this.sharedService.obtenerPokemones().subscribe({
      next: (data: any) => {
        console.log(data);
        this.pokemons = data.results;
        this.cargaPokemons();
      },
      error: (error) => {
        console.error('Error al obtener los Pokémon', error);
      },
      complete: () => { },
    });
  }
  /**Aqui consumimos el recurso obtenerdetallesPokemon**/
  cargaPokemons(): void {
    let loadedPokemons = 0;
    this.pokemons.forEach((pokemon, index) => {
      this.sharedService.obtenerdetallesPokemon(pokemon.name).subscribe({
        next: (details: any) => {
          console.log(details);
          this.pokemons[index].details = details;
          loadedPokemons++;

          if (loadedPokemons === this.pokemons.length) {
            this.updatePaginatedPokemons({ first: 0, rows: this.itemsPerPage }); // Actualizar la lista paginada después de cargar los datos
          }
        },
        error: (error) => {
          console.error('Error al obtener los detalles del Pokémon', error);
          loadedPokemons++;
        },
        complete: () => { },
      });
    });
  }

  /** Actualizamos la pagina con el numero de pokemones **/
  updatePaginatedPokemons(event: any): void {
    const startIndex = event.first;
    const endIndex = startIndex + event.rows;
    this.paginatedPokemons = this.pokemons.slice(startIndex, endIndex);
  }

  /** Evento para que el paginador funcione **/
  onPageChange(event: any): void {
    this.updatePaginatedPokemons(event);
  }

  /**Aqui manipulamos el efecto maquina de escribit del titulo **/
  typingEffect(): void {
    const text = 'Conviertete en un maestro Pokemon';
    let index = 0;
    const speed = 100; // Velocidad en milisegundos entre cada letra

    const maquinaDeEscribir = document.getElementById('maquina-de-escribir')!;
    if (maquinaDeEscribir) {
      function type() {
        if (index < text.length) {
          maquinaDeEscribir.innerHTML += text.charAt(index);
          index++;
          setTimeout(type, speed);
        }
      }
      type();
    }
  }
  /**Seteamos los tipos**/
  getTypes(types: any[]): string {
    if (!types) {
      return '';
    }
    return types.map((type) => type.type.name).join(', ');
  }
  /**Seteamos los habilidades**/
  getAbilities(abilities: any[]): string {
    if (!abilities) {
      return '';
    }
    return abilities.map((ability) => ability.ability.name).join(', ');
  }

  backAgain() {
    this.router.navigate(['']);
  }

}