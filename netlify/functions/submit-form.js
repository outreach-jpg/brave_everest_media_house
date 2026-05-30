const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzIIQ3k2HSh2KOx9PFHTJsmeP7phwxjA9I89IpQHXjnrTeK7hJXRuYYUAaSFYFICqp8/exec';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: event.body,
      redirect: 'follow',
    });

    const text = await response.text();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: err.message }),
    };
  }
};
