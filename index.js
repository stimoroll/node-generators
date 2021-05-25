const PROCESSING = 'processing',
  ERROR = 'error',
  SUCCESS = 'sucess';

const NO_STOCK = 'NO_STOCK',
  INCORRECT_DETAILS = 'INCORRECT_DETAILS',
  NULL = null,
  UNDEFINED = undefined;

const fakeData = [
  {
    state: PROCESSING,
    errorCode: ''
  },
  {
    state: ERROR,
    errorCode: NO_STOCK
  },
  {
    state: PROCESSING,
    errorCode: ''
  },
  {
    state: ERROR,
    errorCode: INCORRECT_DETAILS
  },
  {
    state: SUCCESS,
    errorCode: ''
  }
];

const awiatResult = (callback, time) =>
  new Promise(
    resolve => {
      setTimeout(() => {
        resolve(callback());
      }, time);
    },
    reject => console.error(reject)
  );

/**
 * Gets the processing page
 * @param {array} data
 */

async function getProcessingPage(data) {
  function* generatorFunction(data) {
    for (element of data) {
      yield element;
    }
  }
  const myGenerator = generatorFunction(data);
  let finish = false;
  let result = null;
  do {
    const next = myGenerator.next();
    finish = next.done;
    switch (next?.value?.state) {
      case PROCESSING:
        await awiatResult(() => {}, 2000);
        break;

      case ERROR:
        switch (next.value.errorCode) {
          case NO_STOCK:
            result = { title: 'Error page', message: 'No stockhas been found' };
            break;
          case INCORRECT_DETAILS:
            result = {
              title: 'Error page',
              message: 'Incorrect details have been entered'
            };
            break;
          case NULL:
            result = { title: 'Error page', message: null };
            break;
          case UNDEFINED:
            result = { title: 'Error page', message: null };
            break;
        }
        break;

      case SUCCESS:
        result = { title: 'Order complete', message: null };
        break;
    }
    // console.log("next", next.value);
  } while (finish !== true);
  console.log('result', result);
  return result; //NOT use just simple because its asnc so use only with await
}

getProcessingPage([{ state: 'processing' }, { state: 'error' }]);
getProcessingPage(fakeData);
