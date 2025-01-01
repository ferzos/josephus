import ReactYouTube from 'react-youtube';
import './YouTube.css';

export function YouTube() {
  return (
    <div className="ytContainer">
      <p className="ytSectionTitle">Josephus Problem</p>

      <ReactYouTube
        iframeClassName="iframeContainer"
        videoId="uCsD3ZGzMgE"
        id="uCsD3ZGzMgE"
        title="The Josephus Problem - Numberphile"
        loading="eager"
        opts={{
          width: window.innerWidth * 0.8,
          height: window.innerHeight * 0.8,
          playerVars: {
            end: 48,
            controls: 0,
            disablekb: 1,
          },
        }}
      />
    </div>
  );
}

export default YouTube;
