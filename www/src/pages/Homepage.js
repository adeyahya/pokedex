// @flow
import React from 'react';
import idx from 'idx';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import POKEMONS_QUERY from '../graphql/pokemons.query';
import { type Pokemons } from '../graphql/pokemons.flow';

import PokemonCard from '../components/PokemonCard';

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Homepage = () => {
  const { data, loading } : { data: Pokemons, loading: boolean} = useQuery(POKEMONS_QUERY, {
    variables: {
      page: 1,
      pageSize: 100,
    }
  });
  
  console.log(data);

  const pokemons = idx(data, _ => _.pokemons.items) || [];
  return (
    <Grid>
      {pokemons.map((item, idx) => (
        <PokemonCard key={idx} name={item.name} image={item.image} id={item.id} />
      ))}
      {loading && <p>Loading Pokemon</p>}
    </Grid>
  )
}

export default Homepage;
