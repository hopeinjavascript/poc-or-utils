import { useEffect } from 'react';
import { useState } from 'react';

export const useFetchCustom = (URL, page) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null); // loading | loaded

  useEffect(() => {
    // const controller = new AbortController();
    // const signal = controller.signal;

    async function fetchData() {
      try {
        setLoading('loading'); // setting this here causes issue... check console you will see the DOMException or Fetch aborted error
        const res = await fetch(URL); //{ signal }
        if (!res.ok) {
          const errMsg = `Error in fetching data ${res.ok} ${res.status} ${res.statusText}`;
          console.error({ errMsg });
          throw new Error(errMsg);
        }
        const data = await res.json();
        setData((prevData) => [...prevData, ...data]);

        setLoading('loaded');
      } catch (error) {
        // "DOMException: The user aborted a request." - because we are aborting the request in the clean up function.
        // NO NEED to abort in the first place because we have disabled strict mode
        console.error('-- error', error);
        Errors(error);
        setError('network-error ' + error);
      }
    }

    fetchData();

    return () => {
      // controller.abort();
    };
  }, [page]); //page as deps

  return { data, setData, error, loading };
};

function Errors(err) {
  if (err.name === 'TimeoutError') {
    console.error('Timeout: It took more than 5 seconds to get the result!');
  } else if (err.name === 'AbortError') {
    console.error(
      'Fetch aborted by user action (browser stop button, closing tab, etc.)'
    );
  } else if (err.name === 'TypeError') {
    console.error('AbortSignal.timeout() method is not supported');
  } else {
    // A network error, or some other problem.
    console.error(`Error: type: ${err.name}, message: ${err.message}`);
  }
}
