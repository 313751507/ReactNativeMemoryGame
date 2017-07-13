import LandingPage from '@memory_game_screens/LandingPage';
import CreateGame from '@memory_game_screens/CreateGame';
import JoinGame from '@memory_game_screens/JoinGame';
import PlayGame from '@memory_game_screens/PlayGame';
import ShowGameScore from '@memory_game_screens/ShowGameScore';
import ShowHighScore from '@memory_game_screens/ShowHighScore';
import GameLoading from '@memory_game_screens/GameLoading';

const routes = {
  Landing: { screen: LandingPage, path: 'landing' },
  CreateGame: { screen: CreateGame, path: 'create_game' },
  JoinGame: { screen: JoinGame, path: 'join_game' },
  PlayGame: { screen: PlayGame, path: 'play_game' },
  ShowGameScore: { screen: ShowGameScore, path: 'show_game_score' },
  ShowHighScore: { screen: ShowHighScore, path: 'show_high_score' },
  GameLoading: { screen: GameLoading, path: 'game_loading_screen'}
};

export default routes;
