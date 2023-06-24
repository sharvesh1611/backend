const pe = require('parse-error'); // Parses error so you can read error message and handle them accordingly.

const ReE = async function (res, err, code) { // Error Web Response
  if (typeof err == 'object' && typeof err.message != 'undefined') {
    err = err.message;
  }
  console.log('check error', err);
  if (typeof code !== 'undefined') res.statusCode = code;
  return res.json({ success: false, error: err });
}

const ReS = function (res, data, code) { // Success Web Response
  let send_data = { success: true };

  if (typeof data == 'object') {
    send_data = Object.assign(data, send_data);//merge the objects
  }

  if (typeof code !== 'undefined') res.statusCode = code;
  return res.json(send_data);
};

const to = function (promise) {
  return promise
    .then(data => {
      // console.log('data inside', data);
      return [null, data];
    }).catch(err => {
      // console.log('error', err);
      return [pe(err)]
    }
    );
}

const TE = function (err_message, log) { // TE stands for Throw Error
  if (log === true) {
    console.error(err_message);
  }

  throw new Error(err_message);
}

// This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', pe(error));
});

module.exports = { to, TE, ReE, ReS };