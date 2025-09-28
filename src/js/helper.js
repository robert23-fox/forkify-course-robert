import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long. Timout in ${s} seconds`));
    }, s * 1000);
  });
};

export const AJAX = async function (
  url,
  uploadData = undefined,
  method = "POST"
) {
  try {
    const controller = new AbortController();
    const fetchPro = uploadData
      ? fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: uploadData ? JSON.stringify(uploadData) : undefined,
          signal: controller.signal,
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${data.status})`);

    return data;
  } catch (err) {
    console.error(err);
    if (err.name === "AbortError") {
      console.error("Request aborted (timeout)");
    }
    throw err;
  }
};

/*
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    // const res = await fetch(url);
    const data = await res.json();
    // console.log(data);

    if (!res.ok) throw new Error(`${data.message} (${data.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData, method = "POST") {
  try {
    const controller = new AbortController();
    const fetchPro = fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: uploadData ? JSON.stringify(uploadData) : undefined,
      signal: controller.signal,
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${data.status})`);

    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("Request aborted (timeout)");
    }
    throw err;
  }
};
*/
