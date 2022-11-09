import NavBarNotLogged from "../components/navbar/NavbarNotLogged";
import styles from "../styles/AppointmentOnline.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../context/UserContext";
import ClipLoader from "react-spinners/ClipLoader";
import ConfirmAppoint from "../components/ConfirmAppoint";
import ErrorAlert from "../components/ErrorAlert";
import SuccessfulAlert from "../components/SuccessfulAlert";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

function OnlineAppointment() {
  const { jwt, setJwt } = useContext(Context);
  const [appointBusy, setAppointBusy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateSelected, setDateSelected] = useState(new Date());
  const [updated, setUpdated] = useState({});
  const [reserveDate, setReserveDate] = useState(null);
  const [next, setNext] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  //ALERT
  const [alreadyAppoint, setAlreadyAppoint] = useState(false);
  const [appointSuccessful, setAppointSuccessful] = useState(false);

  const router = useRouter();

  const sumDays = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
  };

  const isClosed = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 1;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://dobleb.herokuapp.com/turno/reservados",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setAppointBusy(res.data);
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 403) {
          window.localStorage.clear("UserLogged");
          setJwt(null);
        }
      } finally {
        setLoading(false);
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

  useEffect(() => {
    if (dateSelected.getDay() === 0 || dateSelected.getDay() === 1) {
      setInvalidDate(true);
    } else {
      setInvalidDate(false);
    }
  }, [dateSelected]);

  console.log(invalidDate);
  const handleChange = (e) => {
    setDateSelected(e);
    console.log(e);
  };

  const reserve = (e) => {
    const date = e.target.value;
    setReserveDate(date);
  };

  const handleReserve = async (reserveDate) => {
    try {
      const res = await axios.post(
        "https://dobleb.herokuapp.com/turno/reservar",
        { date: reserveDate },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (res) {
        setAppointSuccessful(true);
        (() => {
          setTimeout(() => {
            router.push("/profile");
          }, 2000);
        })();
      }
    } catch (error) {
      console.error(error);
      if (error.response.data === "Ya tienes un turno reservado")
        //  alert("Ya tienes un turno reservado");
        setAlreadyAppoint(true);
    }
  };

  const handleNext = () => {
    setNext(true);
  };

  return (
    <>
      <ErrorAlert
        text={"Ya tienes un turno reservado"}
        setFunction={setAlreadyAppoint}
        activated={alreadyAppoint}
      />
      <SuccessfulAlert
        text={"Turno reservado con éxito!"}
        setFunction={setAppointSuccessful}
        activated={appointSuccessful}
      />
      <NavBarNotLogged />
      {!next ? (
        <div className={styles.background}>
          <div className={styles.container}>
            <h2>Selecciona la fecha y hora</h2>
            <div className={styles.calendarContainer}>
              <div className={styles.disabled}></div>
              <DatePicker
                selected={dateSelected}
                timeFormat="HH:mm"
                onChange={handleChange}
                inline
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                maxDate={sumDays(new Date(), 30)}
                filterDate={isClosed}
              />
            </div>
            {jwt ? (
              <>
                {!loading ? (
                  <>
                    <p className={styles.timeTitle}>Horarios disponibles</p>
                    <div className={styles.btnsContainer}>
                      <button
                        disabled={!updated[14]}
                        onClick={reserve}
                        value={updated[14]}
                      >
                        14:00
                      </button>
                      <button
                        disabled={!updated[143]}
                        onClick={reserve}
                        value={updated[143]}
                      >
                        14:30
                      </button>
                      <button
                        disabled={!updated[15]}
                        onClick={reserve}
                        value={updated[15]}
                      >
                        15:00
                      </button>
                      <button
                        disabled={!updated[153]}
                        onClick={reserve}
                        value={updated[153]}
                      >
                        15:30
                      </button>
                      <button
                        disabled={!updated[16]}
                        onClick={reserve}
                        value={updated[16]}
                      >
                        16:00
                      </button>
                      <button
                        disabled={!updated[163]}
                        onClick={reserve}
                        value={updated[163]}
                      >
                        16:30
                      </button>
                      <button
                        disabled={!updated[17]}
                        onClick={reserve}
                        value={updated[17]}
                      >
                        17:00
                      </button>
                      <button
                        disabled={!updated[173]}
                        onClick={reserve}
                        value={updated[173]}
                      >
                        17:30
                      </button>
                    </div>
                    <div className={styles.dateSelected}>
                      {invalidDate ? (
                        <>Selecciona una fecha válida</>
                      ) : (
                        <>
                          Fecha seleccionada{" "}
                          {new Date(dateSelected).toLocaleDateString()} a las{" "}
                          {new Date(reserveDate).toLocaleTimeString()}
                        </>
                      )}
                    </div>
                    <div className={styles.nextBtnContainer}>
                      <button
                        disabled={invalidDate}
                        className={styles.btnReserve}
                        onClick={handleNext}
                      >
                        Siguiente
                        <i class="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={styles.loaderContainer}>
                    <ClipLoader size={60} color={"white"} />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className={styles.notLogged}>
                  Debes tener una sesion abierta para reservar un turno
                </div>
              </>
            )}
          </div>
          <Footer />
        </div>
      ) : (
        <ConfirmAppoint
          dateSelected={dateSelected}
          reserveDate={reserveDate}
          handleReserve={handleReserve}
        />
      )}
    </>
  );
}

export default OnlineAppointment;
