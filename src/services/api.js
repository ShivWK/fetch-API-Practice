localStorage.setItem("token", "bearer abc123");

const BASE_URL = "http://localhost:3000";

export const onSubmit = async (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (key === "file") {
      formData.append(key, data[key][0]);
    } else {
      formData.append(key, data[key]);
    }
  });

  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    let response = await fetch(`${BASE_URL}/api/formData`, {
      method: "POST",
      body: formData, // We dont need to set header "Content-Type" explicitly it will be automatically set bu the fetch sice we have given FormData instance.
    });
    if (!response.ok) throw new Error(response.statusText);

    let data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleGetData = async () => {
  try {
    let response = await fetch(`${BASE_URL}/api/v1/movies`);
    if (!response.ok) throw new Error(response.statusText);

    let data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleGetByIdData = async (id) => {
  try {
    let response = await fetch(`${BASE_URL}/api/v1/movies/${id}`);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleUpdatePutData = async (id) => {
  try {
    let response = await fetch(`${BASE_URL}/api/v1/movies/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: "New Film Star",
        release: 2013,
        duration: 10,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleUpdatePatchtData = async (id) => {
  try {
    let response = await fetch(`${BASE_URL}/api/v1/movies/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name: "New Flim Star" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(response.statusText);

    let data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleDeleteData = async (id) => {
  try {
    let response = await fetch(`${BASE_URL}/api/v1/movies/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(response.statusText);

    if (response.status !== 204) {
      let data = await response.json();
      console.log(data);
    }
  } catch (err) {
    console.error(err.message);
  }
};

const controller = new AbortController();

export const handleWaitApi = async () => {
  try {
    let response = await fetch(`${BASE_URL}/api/waitBaby`, {
      method: "GET",
      signal: controller.signal,
    });
    const data = await response.json();
    alert(data.message);
  } catch (err) {}
};

export const abort = () => {
  controller.abort();
};

const delay = () =>
  new Promise((res, rej) => {
    setTimeout(res, 2000);
  });

export const handleUnstableApi = async (retry = 3) => {
  try {
    const response = await fetch(`${BASE_URL}/api/unstable-endpoint`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    if (retry > 0) {
      await delay();
      console.log("retring...", "remaining attempts: ", retry - 1);
      return handleUnstableApi(retry - 1);
    }

    throw err;
  }
};

// timeout work around

export const handleWaitApi2 = async () => {
    const controller = new AbortController();
    const timer =setTimeout(controller.abort, 4000);

  try {
    let response = await fetch(`${BASE_URL}/api/waitBaby`, {
      method: "GET",
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(response.statusText);
    clearTimeout(timer);
    const data = await response.json();
    alert(data.message);
  } catch (err) {}
};

