import './styles/reset.css';
import './App.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import Fullpage, { FullPageSections } from '@ap.cx/react-fullpage';

import { YouTube } from './modules/YouTube';
import { Josephus } from './modules/Josephus';

function App() {
  return (
    <Fullpage>
      <FullPageSections>
        <YouTube />
        <Josephus />
      </FullPageSections>
    </Fullpage>
  );
}

export default App;
