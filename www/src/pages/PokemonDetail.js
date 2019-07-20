// @flow
import React from "react";
import styled from 'styled-components';
import idx from 'idx';
import Typography from "@material-ui/core/Typography";
import { useQuery } from "react-apollo-hooks";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import ObjectTable from '../components/ObjectTable';

import CircularProgress from "@material-ui/core/CircularProgress";

import { type GetPokemonType } from "../graphql/pokemon.flow";
import POKEMON_QUERY from "../graphql/pokemon.query";

type Props = {
  match: {
    params: {
      id: string
    }
  }
};

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: "400px",
    margin: "0 auto",
    marginTop: "20px"
  }
}));

const PokemonDetail = (props: Props) => {
  const classes = useStyles();
  const {
    data,
    loading
  }: { data: GetPokemonType, loading: boolean } = useQuery(POKEMON_QUERY, {
    variables: {
      id: props.match.params.id
    }
  });

  const {
    id,
    image,
    name,
    ...rest
  } = idx(data, _ => _.pokemon) || {};

  if (loading) return (
    <Paper className={classes.root}>
      <center>
        <CircularProgress />
      </center>
    </Paper>
  );;


  return (
    <Paper className={classes.root}>
      <FlexWrapper>
        <img src={image} alt={name} />
        <Typography variant="h4" component="h2">
          {name}
        </Typography>
      </FlexWrapper>
      <ObjectTable object={rest} />
    </Paper>
  );
};

export default PokemonDetail;
