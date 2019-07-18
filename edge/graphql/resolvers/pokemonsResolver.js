module.exports = {
  Query: {
    pokemons: async (_, args, {service}) =>
      await service.pokemon.getPokemons(args),
  }
}