//import { Button } from './components/Button';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRomm';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

import { AuthContextProvider } from "./contexts/AuthContext"

function App() {
  return (
    //<Button />
    //<Button>Clique aqui 2</Button>
    <BrowserRouter> 
      <AuthContextProvider>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/rooms/new" component={NewRoom}/>
          <Route path="/rooms/:id" component={Room}/>
          <Route path="/admin/rooms/:id" component={AdminRoom}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
    );
}

export default App;
