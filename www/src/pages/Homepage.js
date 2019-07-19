// @flow
import React from 'react';
import idx from 'idx';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';

import POKEMONS_QUERY from '../graphql/pokemons.query';
import { type Pokemons } from '../graphql/pokemons.flow';

import PokemonCard from '../components/PokemonCard';
import useIntersect from '../hooks/useIntersect';

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Homepage = () => {
  const { data, loading, fetchMore }: { data: Pokemons, loading: boolean, fetchMore: (any) => void } = useQuery(POKEMONS_QUERY, {
    variables: {
      page: 1,
      pageSize: 50,
    },
    notifyOnNetworkStatusChange: true,
  });

  const pokemons = idx(data, _ => _.pokemons.items) || [];
  const nextPage = idx(data, _ => _.pokemons.nextPage);

  function loadMore() {
    if (!nextPage) return;
    fetchMore({
      variables: {page: nextPage},
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log(fetchMoreResult)
        return {
          pokemons: {
            ...fetchMoreResult.pokemons,
            items: [
              ...prev.pokemons.items,
              ...fetchMoreResult.pokemons.items,
            ]
          }
        }
      }
    });
  }

  useIntersect(loadMore);

  return (
    <div>
      <Grid>
        {pokemons.map((item, idx) => (
          <PokemonCard key={idx} name={item.name} image={item.image} id={item.id} />
        ))}
      </Grid>
      {loading && (
        <center><CircularProgress /></center>
      )}
    </div>
  )
}

export default Homepage;
