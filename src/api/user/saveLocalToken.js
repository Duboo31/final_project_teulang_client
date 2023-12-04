const saveLocalStorageToken = (access, refresh) => {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);

  const base64Url = access.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  localStorage.setItem("payload", jsonPayload);
};

export { saveLocalStorageToken };
