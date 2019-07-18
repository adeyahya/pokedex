import { gql } from 'apollo-boost';
import pokemonFragment from './fragments/pokemon.query';

export default gql`
  query pokemons($page: Int, $pageSize: Int) {
    pokemons(page: $page, pageSize: $pageSize) {
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