import Homepage from './pages/Homepage';
import PokemonDetail from './pages/PokemonDetail';

export default [
  {
    path: '/',
    exact: true,
    component: Homepage,
  },
  {
    path: '/pokemon/:id',
    exact: true,
    component: PokemonDetail,
  }
]
