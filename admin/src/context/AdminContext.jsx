import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { AppContext } from "../../../frontend/src/context/AppContext";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : "",
  );
  const [dashboardData, setDashboardData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [faqData, setFaqData] = useState([]);

  const loginAdmin = async (email, password) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/login-admin`, {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("atoken", data.atoken);
        setToken(data.atoken);
        toast.success("Berhasil masuk");
        return true;
      }
      toast.error(data.message || "Login gagal!");
      return false;
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan pada saat login!");
      return false;
    }
  };

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setDashboardData(data.dashboard);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getHistoryData = async () => {
  try {

    const { data } = await axios.get(
      `${backendUrl}/api/admin/history-admin`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setHistoryData(data.history);
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

const getFAQ = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/admin/faq`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      setFaqData(data.faq);
    }
  } catch (error) {
    console.log(error);
  }
};

const addFAQ = async (question, answer) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/admin/add-faq`,
      { question, answer },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      toast.success(data.message);
      getFAQ();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

const updateFAQ = async (faqId, question, answer) => {
  try {
    const { data } = await axios.put(
      `${backendUrl}/api/admin/update-faq/${faqId}`,
      { question, answer },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      toast.success(data.message);
      getFAQ();
    }
  } catch (error) {
    toast.error(error.message);
  }
};

const deleteFAQ = async (faqId) => {
  try {
    const { data } = await axios.delete(
      `${backendUrl}/api/admin/delete-faq/${faqId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      toast.success(data.message);
      getFAQ();
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  

  const value = {
    loginAdmin,
    token,
    dashboardData,
    getDashboardData,
    historyData,
    getHistoryData,
    faqData, getFAQ, addFAQ,
    updateFAQ, deleteFAQ
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
