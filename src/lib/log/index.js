
class log { }

/**
 *  Generate success log
 */
log.success = (msg, data) => {
  if (msg && data !== undefined) {
    console.log(
      `%c ${msg}`,
      `background:${'green'};color:${'black'}`,
      data
    );
  } else {
    console.log(msg);
  }
};

/**
 *  Generate error log
 */
log.error = (msg, data) => {
  if (msg && data !== undefined) {
    console.log(
      `%c ${msg}`,
      `background:${'red'};color:${'black'}`,
      data
    );
  } else {
    console.log(msg);
  }
};

/**
 *  Generate warning log
 */
log.warn = (msg, data) => {
  if (msg && data !== undefined) {
    console.log(
      `%c ${msg}`,
      `background:${'pink'};color:${'black'}`,
      data
    );
  } else {
    console.log(msg);
  }
};

/**
 *  Generate info log
 */
log.info = (msg, data) => {
  if (msg && data !== undefined) {
    console.log(
      `%c ${msg}`,
      `background:${'yellow'};color:${'black'}`,
      data
    );
  } else {
    console.log(msg);
  }
};

export default log;
