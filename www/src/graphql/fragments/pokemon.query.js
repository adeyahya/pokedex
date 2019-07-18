import { gql } from 'apollo-boost';

export default gql`
  fragment PokemonType on Pokemon {
    id
    name
    classification
    types
    resistant
    weaknesses
    height {
      minimum
      maximum
    }
    weight {
      minimum
      maximum
    }
    fleeRate
    evolutionRequirements {
      amount
      name
    }
    evolutions {
      id
      name
    }
    attacks {
      fast {
        name
        type
        damage
      }
      special {
        name
        type
        damage
      }
    }
  }
`;