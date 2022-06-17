import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../componenti/Layout";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiEuro } from "react-icons/bi";
import { MaterialButton } from "../../componenti/MaterialUI";
import "./style.css";
import { addToCarrello, getPartitaDetailsById } from "../../azioni";
import { useParams, Link, useNavigate } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';
import store from "../../store";
import {generatePublicUrl} from '../../urlConfig';




/**
* @author
* @function PartitaDetailsPage
**/

const PartitaDetailsPage = (props) => {

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const dispatch = useDispatch();
  const Partite = useSelector((state) => state.partite);
  let data = new Date(Partite.partitaDetails.dataOraPartita);
  data = data.toLocaleDateString("it-IT", options);
  const navigate = useNavigate();
  const { IdPartita } = useParams();
  
  // console.log(IdPartita);


  useEffect(() => {
    const payload = {
      params: {
        IdPartita,
      },
    };
    dispatch(getPartitaDetailsById(payload));
  }, []);

  if (Object.keys(Partite.partitaDetails).length === 0) {
    return null;
  }

  return (
    <Layout>
      {/* <div>{product.productDetails.name}</div> */}
      <div className="productDescriptionContainer">
        <div className="flexRow">
          {/* <div className="verticalImageStack">
            {Partite.partitaDetails.ImmaginePartita.map((thumb, index) => (
              <div className="thumbnail">
                <img src={thumb.img} alt={thumb.img} />
              </div>
            ))}
          </div> */}
          <div className="productDescContainer">
            {Partite.partitaDetails.ImmaginePartita[0] ?
              <div className="productDescImgContainer">
                <img
                  src={generatePublicUrl(Partite.partitaDetails.ImmaginePartita[0].img)}
                  alt={`${Partite.partitaDetails.ImmaginePartita[0].img}`}
                />
              </div>
              :
              null
            }

          </div>
        </div>
        <div>
          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li>
                <a href="/">Home</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">{Partite.partitaDetails.squadra1} - {Partite.partitaDetails.squadra2}</a>
              </li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
            <p
              className="productTitle">
              {Partite.partitaDetails.squadra1} - {Partite.partitaDetails.squadra2}</p>
            <p
              className="productOrario">
              <span
                style={{
                  width: "100px",
                  fontSize: "12px",
                  color: "#878787",
                  fontWeight: "600",
                  marginRight: "20px",
                }}
              >
                Orairio
              </span>
              {data}
            </p>
            <p
              className="productVenue">
              <span
                style={{
                  width: "100px",
                  fontSize: "12px",
                  color: "#878787",
                  fontWeight: "600",
                  marginRight: "20px",
                }}
              >
                Stadio
              </span>
              {Partite.partitaDetails.IdStadio ? `${Partite.partitaDetails.IdStadio.nome}, 
              ${Partite.partitaDetails.IdStadio.citta}, ${Partite.partitaDetails.IdStadio.regione}` : "N/A"}</p>
            {/* <div>
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            <div className="extraOffer">
              Extra <BiEuro />
              4500 off{" "}
            </div> */}
            <div className="flexRow priceContainer">
              <span className="price">
                <BiEuro />
                {Partite.partitaDetails.prezzoBigliettoPartita}
              </span>
              {/* <span>i</span> */}
            </div>
            <div>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "12px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#212121",
                  }}
                >
                  {Partite.partitaDetails.descrizione}
                </span>
              </p>
            </div>
          </div>
          {/* action buttons */}
          {(Partite.partitaDetails.IdStadio.totalePostiStadio - Partite.partitaDetails.totalePostiOccupati) > 0 ?
            <div className="flexRow">
              <MaterialButton
                title="AGGIUNGI AL CARRELLO"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: "5px",
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, squadra1, squadra2, prezzoBigliettoPartita, totalePostiOccupati } = Partite.partitaDetails;
                  const nome = `${squadra1} - ${squadra2}`;
                  const { totalePostiStadio } = Partite.partitaDetails.IdStadio;
                  const img = Partite.partitaDetails.ImmaginePartita[0] ? Partite.partitaDetails.ImmaginePartita[0].img : null;
                  console.log(store.getState());
                  dispatch(addToCarrello({ _id, nome, prezzoBigliettoPartita, totalePostiStadio, totalePostiOccupati, img }));
                  navigate(`/carrello`);
                }}
              />
            </div>
            :
            <span
              style={{
                fontSize: "30px",
                color: "red",
                fontWeight: "600",
              }}
            >
              BIGLIETTI ESAURITI CI DISPIACE!!
            </span>
          }
        </div>
      </div>
    </Layout>
  );
}

export default PartitaDetailsPage