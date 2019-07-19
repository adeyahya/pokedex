module.exports = {
  Query: {
    pokemon: async (_, args, {service}) =>
      await service.pokemon.getPokemon(args),
  }
}