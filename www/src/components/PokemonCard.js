// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  id: string,
  name: string,
  image: string,
}

const Wrapper = styled.div`
  width: 116px;
  padding: 5px;
`;

const Inner = styled.div`
  padding: 5px;
  background-color: whitesmoke;
  text-align: center;
  border-radius: 10px;
`;

const PokemonCard = ({id, name, image}: Props) => (
  <Wrapper>
    <Inner>
      <Link to={`/pokemon/${id}`}>
        <img src={image} alt={name}/>
        <h4>{name}</h4>
      </Link>
    </Inner>
  </Wrapper>
)

export default PokemonCard;
