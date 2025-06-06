// src/admin/Account.jsx

export const adminAccounts = (email, password) => {
  if (email === "admin@gmail.com" && password === "admin111") {
    const admin = { role: "admin", email };
    localStorage.setItem("auth", JSON.stringify(admin));
    return admin;
  } else if (email === "user@exp.com" && password === "user123") {
    const user = { role: "user", email };
    localStorage.setItem("auth", JSON.stringify(user));
    return user;
  }
  return null;
};

export const getCurrentAuth = () => {
  const data = localStorage.getItem("auth");
  return data ? JSON.parse(data) : null;
};

export const clearAuth = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("user");
};
