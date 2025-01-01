import './styles/reset.css';
import './App.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import ReactPageScroller from 'react-page-scroller';
import { YouTube } from './modules/YouTube';
import { Josephus } from './modules/Josephus';

function App() {
  return (
    <ReactPageScroller>
      <YouTube />
      <Josephus />
    </ReactPageScroller>
  );
}

export default App;
