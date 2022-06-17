import React, { useEffect, useState } from "react";
import "./style.css";
// import flipkartLogo from "../../images/logo/flipkart.png";
// import goldenStar from "../../images/logo/golden-star.png";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, getCartItems, registrazione as _registrazione } from "../../azioni";
import Cart from "../UI/Cart";

/**
* @author
* @function Header
**/

const Header = (props) => {
    const [loginModal, setLoginModal] = useState(false);
    const [regitrazione, setRegistrazione] = useState(false);
    const [nome, setNome ] = useState("");
    const [cognome, setCognome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    // state cart value
    const Carrello = useSelector((state) => state.carrello);
  
    const userRegistrazione = () => {
      const utente = { nome, cognome, email, password };
      if (
        nome === "" ||
        cognome === "" ||
        email === "" ||
        password === ""
      ) {
        return;
      }
  
      dispatch(_registrazione(utente));
    };
  
    const userLogin = () => {
      if (regitrazione) {
        userRegistrazione();
      } else {
        dispatch(login({ email, password }));
      }
    };
  
    const logout = () => {
      dispatch(signout());
    };
  
    useEffect(() => {
      if (auth.authenticate) {
        setLoginModal(false);
      }
    }, [auth.authenticate]);
  
    // useEffect(() => {
    //   dispatch(getCartItems());
    // }, []);
  
    const renderLoggedInMenu = () => {
      return (
        <DropdownMenu
          menu={<a className="fullName">{auth.utente.fullname}</a>}
          menus={[
            // { label: "My Profile", href: "", icon: null },
            {
              label: "Ordini",
              href: `/account/ordini`,
              icon: null,
            },
            { label: "Logout", href: "", icon: null, onClick: logout },
          ]}
        />
      );
    };
  
    const renderNonLoggedInMenu = () => {
      return (
        <DropdownMenu
          menu={
            <a
              className="loginButton"
              onClick={() => {
                setRegistrazione(false);
                setLoginModal(true);
              }}
            >
              Login
            </a>
          }
          menus={[
            // { label: "My Profile", href: "", icon: null, onClick: () => {
            //     !auth.authenticate && setLoginModal(true);
            //   }, },
            {
              label: "Orders",
              href: `/account/orders`,
              icon: null,
              onClick: () => {
                !auth.authenticate && setLoginModal(true);
              },
            },
          ]}
          firstMenu={
            <div className="firstmenu">
              <span>Nuovo Cliente?</span>
              <a
                onClick={() => {
                  setLoginModal(true);
                  setRegistrazione(true);
                }}
                style={{ color: "#2874f0" }}
              >
                Registrati
              </a>
            </div>
          }
        />
      );
    };
  
    return (
      <div className="header">
        <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
          <div className="authContainer">
            <div className="row">
              <div className="leftspace">
                <h2>Login</h2>
                <p>Accedi per consulatare i tuoi Ordini</p>
              </div>
              <div className="rightspace">
                <div className="loginInputContainer">
                  {auth.error && (
                    <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
                  )}
                  {regitrazione && (
                    <MaterialInput
                      type="text"
                      label="Nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  )}
                  {regitrazione && (
                    <MaterialInput
                      type="text"
                      label="Cognome"
                      value={cognome}
                      onChange={(e) => setCognome(e.target.value)}
                    />
                  )}
  
                  <MaterialInput
                    type="text"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MaterialInput
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // rightElement={<a href="#">Forgot?</a>}
                  />
                  <MaterialButton
                    title={regitrazione ? "Registrazione" : "Login"}
                    bgColor="#fb641b"
                    textColor="#ffffff"
                    style={{
                      margin: "40px 0 20px 0",
                    }}
                    onClick={userLogin}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <div className="subHeader">
          {/* Logo  */}
          <div className="logo">
            <a href={`/`} style={{ marginTop: "-10px" }}>
              <span className="exploreText">Biglietteria</span>
              <span className="plusText">Online</span>
            </a>
          </div>
          {/* logo ends here */}
  
          {/* search component */}
          {/* <div
            style={{
              padding: "0 10px",
            }}
          >
            <div className="searchInputContainer">
              <input
                className="searchInput"
                placeholder={"search for products, brands and more"}
              />
              <div className="searchIconContainer">
                <IoIosSearch
                  style={{
                    color: "#2874f0",
                  }}
                />
              </div>
            </div>
          </div> */}
          {/* search component ends here */}
  
          {/* right side menu */}
          <div className="rightMenu">
            {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}

            <div>
              <a href={`/carrello`} className="cart">
                <Cart count={Object.keys(Carrello.ArticoliCarrello).length} />
                <span style={{ margin: "0 10px" }}>Carrello</span>
              </a>
            </div>
          </div>
          {/* right side menu ends here */}
        </div>
      </div>
    );
  };

export default Header
