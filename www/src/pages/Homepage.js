// @flow
/* eslint react-hooks/exhaustive-deps: */
import React, { useState, useEffect, useRef } from "react";
import idx from "idx";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

import CircularProgress from "@material-ui/core/CircularProgress";

import POKEMONS_QUERY from "../graphql/pokemons.query";
import { type Pokemons } from "../graphql/pokemons.flow";

import PokemonCard from "../components/PokemonCard";
import useIntersect from "../hooks/useIntersect";

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Homepage = () => {
  const isInitialMount = useRef(true);
  const filterTimeout = useRef(null);
  const [keyword, setKeyword] = useState(null);
  const {
    data,
    loading,
    fetchMore
  }: { data: Pokemons, loading: boolean, fetchMore: any => void } = useQuery(
    POKEMONS_QUERY,
    {
      variables: {
        page: 1,
        pageSize: 50
      }
    }
  );

  const pokemons = idx(data, _ => _.pokemons.items) || [];
  const nextPage = idx(data, _ => _.pokemons.nextPage);

  function loadMore() {
    if (!nextPage) return;
    fetchMore({
      variables: { page: nextPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        return {
          pokemons: {
            ...fetchMoreResult.pokemons,
            items: [...prev.pokemons.items, ...fetchMoreResult.pokemons.items]
          }
        };
      }
    });
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      filterTimeout.current && clearTimeout(filterTimeout.current);
      filterTimeout.current = setTimeout(() => {
        fetchMore({
          variables: {
            filter: {
              name: keyword
            }
          },
          updateQuery: (_, { fetchMoreResult }) => {
            return fetchMoreResult;
          }
        });
      }, 300);
    }
  }, [keyword]);

  const handleFilterChange = e => {
    setKeyword(e.currentTarget.value);
  };

  useIntersect(loadMore);

  return (
    <div>
      <TextField
        id="outlined-search"
        label="Filter by Name"
        type="search"
        margin="normal"
        variant="outlined"
        fullWidth
        onChange={handleFilterChange}
      />
      {pokemons.length === 0 && keyword && !loading && (
        <p>
          Pokemon with name <strong>{keyword}</strong> can't be found!
        </p>
      )}
      <Grid>
        {pokemons.map((item, idx) => (
          <PokemonCard
            key={idx}
            name={item.name}
            image={item.image}
            id={item.id}
          />
        ))}
      </Grid>
      {loading && !keyword && (
        <center>
          <CircularProgress />
        </center>
      )}
    </div>
  );
};

export default Homepage;
