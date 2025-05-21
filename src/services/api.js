localStorage.setItem("token", "bearer abc123");

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
    let response = await fetch("/api/formData", {
      method: "POST",
      body: formData, // We dont need to set header "Content-Type" explicitly it will be automatically set bu the fetch sice we have given FormData instance.
    });
    let data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleGetData = async () => {
  try {
    let response = await fetch("/api/v1/movies");
    let data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleGetByIdData = async (id) => {
  try {
    let response = await fetch(`/api/v1/movies/${id}`);
    console.log(response);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleUpdatePutData = async (id) => {
  try {
    let response = await fetch(`/api/v1/movies/${id}`, {
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
    console.log(response);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleUpdatePatchtData = async (id) => {
  try {
    let response = await fetch(`/api/v1/movies/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name: "New Flim Star" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleDeleteData = async (id) => {
  try {
    let response = await fetcg(`/api/v1/movies/${id}`, {
      method: "DELETE",
    });
    let data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
};

const controller = new AbortController();

export const handleWaitApi = async () => {
  try {
    let response = await fetch("/api/waitBaby", {
      method: "GET",
      signal: controller.signal,
    });
    alert(response.data.message);
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
    const response = await fetch("/api/unstable-endpoint");
    const data = await response.json();
    console.log(data.message);
  } catch (err) {
    if (retry > 0) {
      await delay();
      console.log("retring...", "remaining attempts: ", retry - 1);
      return handleUnstableApi(retry - 1);
    }

    throw err;
  }
};
