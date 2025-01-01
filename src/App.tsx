import './styles/reset.css';
import './App.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import ReactPageScroller from 'react-page-scroller';
import { YouTube } from './components/YouTube';
import { Josephus } from './components/Josephus';

function App() {
  return (
    <ReactPageScroller>
      <YouTube />
      <Josephus />
    </ReactPageScroller>
  );

  return (
    // <ReactPageScroller>
    <div style={{ display: 'flex', flexDirection: 'column' }} />
    // </ReactPageScroller>
  );
}

export default App;
