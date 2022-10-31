import NavBarNotLogged from "../components/navbar/NavbarNotLogged";
import styles from "../styles/AppointmentOnline.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../context/UserContext";

const ocupados = [
  "Tue Oct 18 2022 14:00:00 GMT-0300 (hora estándar de Argentina)",
  "Tue Oct 18 2022 15:00:00 GMT-0300 (hora estándar de Argentina)",
  "Tue Oct 25 2022 17:00:00 GMT-0300 (hora estándar de Argentina)",
  "Sat Oct 22 2022 15:30:00 GMT-0300 (hora estándar de Argentina)",
];

function OnlineAppointment() {
  const { jwt, setJwt } = useContext(Context);
  const [appointBusy, setAppointBusy] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3010/turno/reservados", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setAppointBusy(res.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    if (jwt) fetchData();
  }, [jwt]);

  const setHours = (hour, minute) => {
    let timestamp = dateSelected.setHours(hour, minute, 0);
    let date = new Date(timestamp);
    const res = appointBusy.some((e) => e === date.toString());
    if (res) return false;
    return date;
  };

  const [dateSelected, setDateSelected] = useState(new Date());
  const [updated, setUpdated] = useState({});
  const [reserveDate, setReserveDate] = useState(null);

  useEffect(() => {
    const xd = () => {
      const dates = {
        14: setHours(14, 0),
        143: setHours(14, 30),
        15: setHours(15, 0),
        153: setHours(15, 30),
        16: setHours(16, 0),
        163: setHours(16, 30),
        17: setHours(17, 0),
        173: setHours(17, 30),
      };
      setUpdated(dates);
    };
    if (appointBusy) {
      xd();
    }
  }, [dateSelected, appointBusy]);

  const handleChange = (e) => {
    setDateSelected(e);
    console.log(e);
  };

  const reserve = (e) => {
    const date = e.target.value;
    setReserveDate(date);
  };

  const handleReserve = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3010/turno/reservar",
        { date: reserveDate.toString() },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (res) alert("enviado");
    } catch (error) {
      console.error(error.response.data);
      if (error.response.data === "Ya tienes un turno reservado")
        alert("Ya tienes un turno reservado");
    }
  };

  return (
    <>
      <NavBarNotLogged />
      <div className={styles.container}>
        <DatePicker
          selected={dateSelected}
          timeFormat="HH:mm"
          onChange={handleChange}
          inline
          dateFormat="MMMM d, yyyy h:mm aa"
          excludeDates={[
            new Date(
              "Sat Oct 20 2022 17:00:00 GMT-0300 (hora estándar de Argentina)"
            ),
          ]}
        />

        <button disabled={!updated[14]} onClick={reserve} value={updated[14]}>
          14:00
        </button>
        <button disabled={!updated[143]} onClick={reserve} value={updated[143]}>
          14:30
        </button>
        <button disabled={!updated[15]} onClick={reserve} value={updated[15]}>
          15:00
        </button>
        <button disabled={!updated[153]} onClick={reserve} value={updated[153]}>
          15:30
        </button>
        <button disabled={!updated[16]} onClick={reserve} value={updated[16]}>
          16:00
        </button>
        <button disabled={!updated[163]} onClick={reserve} value={updated[163]}>
          16:30
        </button>
        <button disabled={!updated[17]} onClick={reserve} value={updated[17]}>
          17:00
        </button>
        <button disabled={!updated[173]} onClick={reserve} value={updated[173]}>
          17:30
        </button>
        <button onClick={handleReserve}>Reservar</button>
      </div>
    </>
  );
}

export default OnlineAppointment;
