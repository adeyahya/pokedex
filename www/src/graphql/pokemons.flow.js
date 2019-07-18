// @flow
import { type Pokemon } from './pokemon.flow';

export type Pokemons = {
  pokemons: ?{
    page: number,
    totalPage: number,
    total: number,
    nextPage: ?number,
    items: [Pokemon]
  }
}