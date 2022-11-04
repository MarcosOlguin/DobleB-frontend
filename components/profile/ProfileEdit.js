import styles from "../../styles/ProfileEdit.module.css";

function ProfileEdit({ handleChange, handlePassReset, handleUpdate, data }) {
  return (
    <div className={styles.editContainer}>
      <div className={styles.editSubContainer}>
        <div>
          <p>Nombre</p>
          <input value={data.name} onChange={handleChange} name="name" />
        </div>
        <div>
          <p>Apellido</p>
          <input value={data.surname} onChange={handleChange} name="surname" />
        </div>
        <div>
          <p>Email</p>
          <input value={data.email} onChange={handleChange} name="email" />
        </div>
        <div>
          <p>Teléfono</p>
          <input
            value={data.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
          />
        </div>
      </div>
      <div className={styles.editBtnsContainer}>
        <button onClick={handleUpdate}>Guardar cambios</button>
        <button onClick={handlePassReset}>Reestablecer contraseña</button>
      </div>
    </div>
  );
}

export default ProfileEdit;
