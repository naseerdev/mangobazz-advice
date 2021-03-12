import { useEffect, useState } from 'react';
import { apiUrl } from './constants';
import './style/style.css';
import info from './info.svg';
import reload from './refresh.svg';
import ReactTooltip from 'react-tooltip';

function App() {

  const [advice, setAdvice] = useState();
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    getNewAdvice();
  }, []);

  const getNewAdvice = async () => {
    setReloadFlag(prevFlag => prevFlag = true);
    let res = await fetch(apiUrl, {
      method: 'GET',
      cache: "no-cache"
    });
    let data = await res.json();

    if (data) {

      setAdvice(prevAdvise => prevAdvise = data?.slip?.advice);
      setTimeout(() => {
        setReloadFlag(prevFlag => prevFlag = false);
      }, 800);
    }
  };

  const handleClick = () => {
    getNewAdvice();
  };

  const handleTextCopy = () => {
    if (advice) {
      navigator.clipboard.writeText(advice);
      ReactTooltip.show();
    }
  }

  const handleTweet = () => {
    if (advice) {
      window.open(`https://twitter.com/share?url=${advice}`);
    }
  }

  return (
    <div className="container">
      <div className="advice-container">
        <h5> Advice for the young at heart</h5>
        <div className="advice-box">
          <div className="advice">
            <div className="icon">
              <img src={info} alt="" />
            </div>
            <p> {advice}</p>
            <div className="reload">
              {advice && <img className={reloadFlag ? "reload-active" : ''} src={reload} alt="refresh-logo" onClick={handleClick} />}
            </div>
          </div>
        </div>
        <div className="button-container">
          <button data-event="click" data-tip="Copied!" onClick={handleTextCopy}>Copy</button>
          <ReactTooltip delayHide={1000} afterShow={() => ReactTooltip.hide()} />
          <button onClick={handleTweet}>Tweet</button>
        </div>
      </div>
    </div>
  );
}

export default App;
