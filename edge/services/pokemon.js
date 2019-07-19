const pokemons = require('../data/pokemons.json');
const idx = require('idx');

module.exports = {
  getPokemons: (args = {}) => {
    const page = args.page || 1;
    const pageSize = args.pageSize || 20;
    const filterByName = idx(args, _ => _.filter.name);
    const startPosition = (page - 1) * pageSize;
    const endPosition = (page * pageSize) - 1;
    let items = pokemons;

    if (filterByName) {
      items = items.filter(
        item => item
          .name
          .toLowerCase()
          .indexOf(
            filterByName.toLowerCase()
          ) !== -1
      );
    } else {
      items = items.slice(startPosition, endPosition);
    }
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