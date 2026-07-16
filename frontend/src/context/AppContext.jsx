import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false,
  );
  const [userData, setUserData] = useState(null);
  const [history, setHistory] = useState([]);
  const [faqData, setFaqData] = useState([]);


  const registerUser = async (name, email, password) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/user/register`,
      {
        name,
        email,
        password,
      }
    );

    if (data.success) {
      localStorage.setItem("token", data.token);
      setToken(data.token);

      toast.success("Berhasil membuat akun");
      return true;
    }

    toast.error(data.message);
    return false;
  } catch (error) {
    console.log(error);
    toast.error("Terjadi kesalahan pada saat registrasi");
    return false;
  }
};

  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
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

  const loadProfileData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUserData(response.data.userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const analyzText = async (text) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/predict`,
        { text },
        {
          headers: {
            token,
          },
        },
      );

      if (data.success) {
        if (token) {
          await getHistory();
        }
        return data.result;
      }

      toast.error(data.message);
      return null;
    } catch (error) {
      console.log(error);
      toast.error("Gagal melakukan analisis");
      return null;
    }
  };

  const getHistory = async () => {
    console.log("Masuk getHistory");
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response:", data);

      if (data.success) {
        setHistory(data.history.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan pada saat mengambil riwayat pesanan");
    }
  };

  const getFaq = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/faq`);

      if (data.success) {
        setFaqData(data.faq);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    backendUrl,
    registerUser,
    loginUser,
    token,
    setToken,
    userData,
    getHistory,
    history,
    analyzText, faqData, getFaq
  };

  useEffect(() => {
    const loadData = async () => {
      if (token) {
        await loadProfileData();
        await getHistory();
      }
    };

    loadData();
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
