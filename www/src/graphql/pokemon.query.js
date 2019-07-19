import { gql } from 'apollo-boost';
import pokemonFragment from './fragments/pokemon.query';

export default gql`
  query pokemon($id: ID!) {
    pokemon(id: $id) {
      ...PokemonType
    }
  }
  ${pokemonFragment}
`;