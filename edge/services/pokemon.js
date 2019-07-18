const pokemons = require('../data/pokemons.json');

module.exports = {
  getPokemons: (args = {}) => {
    const page = args.page || 1;
    const pageSize = args.pageSize || 20;
    const startPosition = (page - 1) * pageSize;
    const endPosition = (page * pageSize) - 1;
    const items = pokemons.slice(startPosition, endPosition);
    const total = pokemons.length; 
    const totalPage = Math.ceil(total / pageSize);
    return Promise.resolve({
      page,
      items,
      totalPage,
      total,
      nextPage: page < totalPage ? page + 1 : null, 
    });
  }
}