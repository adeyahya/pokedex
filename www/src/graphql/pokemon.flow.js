// @flow
export type Unit = {
  minimum: string,
  maximum: string
}

export type EvoRequirements = {
  amount: number,
  name: string,
}

export type Evolution = {
  id: string,
  name: string
}

export type Attack = {
  name: string,
  type: string,
  damage: number
}

export type Attacks = {
  fast: Array<Attack>,
  special: Array<Attack>
}

export type Pokemon = {
  id: string,
  name: string,
  image: string,
  classification: Array<string>,
  types: Array<string>,
  resistant: Array<String>,
  weaknesses: Array<string>,
  weight: Unit,
  height: Unit,
  fleeRate: number,
  evolutionRequirements: EvoRequirements,
  evolutions: Array<Evolution>,
  maxCP: number,
  maxHP: number,
  attacks: Attacks,
  __typename: string,
}

export type GetPokemonType = {
  pokemon: Pokemon
}
