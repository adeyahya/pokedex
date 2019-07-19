import { gql } from 'apollo-boost';
import pokemonFragment from './fragments/pokemon.query';

export default gql`
  query pokemons($page: Int, $pageSize: Int, $filter: filterPokemonInput) {
    pokemons(page: $page, pageSize: $pageSize, filter: $filter) {
      page
      nextPage
      total
      totalPage
      items {
        ...PokemonType
      }
    }
  }
  ${pokemonFragment}
`;