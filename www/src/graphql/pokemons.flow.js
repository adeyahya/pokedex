// @flow
import { type Pokemon } from './pokemon.flow';

export type Pokemons = {
  page: number,
  totalPage: number,
  total: number,
  nextPage: ?number,
  items: [Pokemon]
}