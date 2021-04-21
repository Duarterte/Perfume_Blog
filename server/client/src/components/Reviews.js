import React from "react";
import { Card, Row } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import loli from "./images/lolita.jpg";
import cha from "./images/chanel.png";
import lou from "./images/loulou.jpg";
import orchid from "./images/blackorchid.jpg";
import lancome from "./images/poemlancome.jpg";
import mainson from "./images/mainson.jpg";
import blue from "./images/blue.jpg";
import rochas from "./images/femme.jpg";
import dior2 from "./images/missdior.webp";
import addict from "./images/dioraddict.jpg";

const baccarat = mainson;                                           //need the variable names match with the title of the perfume review image in lowecase
const poeme = lancome;
const loulou = lou;
const lolita = loli;
const chanel = cha;
const black = orchid;
const lheure = blue;
const femme = rochas;
const miss = dior2;
const dior = addict;

const GET_REVIEWS = gql`
  query {
    getPerfs {
      id
      perfTitle
      perfBody
      calification
    }
  }
`;

function Reviews() {
  const { loading, error, data } = useQuery(GET_REVIEWS);
  if (loading) return <h2>loading</h2>;
  if (error) return <h2>{error}</h2>;

  const handleImageName = (index) => {
    let getThePerfImgTitle = data.getPerfs[index]["perfTitle"]
    let splitThePerfImgTitle = getThePerfImgTitle.split(" ")[0]
    let finalPermumeTitleInLowerCase = splitThePerfImgTitle.toLowerCase();

    if (/l.heure/.test(finalPermumeTitleInLowerCase)) {                                                  // Fixing a problem with ['] character
      finalPermumeTitleInLowerCase = "lheure";
    }
    try {
      return eval(finalPermumeTitleInLowerCase);                                                        // if the image of the review fetch exist then return the image else just return
    } catch (err) {
      console.log(err);
      return;
    }
  };
  return (
    <>
      <Row>
        {data.getPerfs.map((ele, index) => {
          return (
            <Card className="col-12 col-xl-6" key={ele.id}>
              <Card.Body>
                <Card.Title className="text-center">
                  <h3>{ele.perfTitle}</h3>
                </Card.Title>
                <Card.Img src={handleImageName(index)}></Card.Img>
                <Card.Text>{ele.perfBody}</Card.Text>
                <Card.Footer
                  className="bg-light"
                  data-toggle="tooltip"
                  title={ele.calification * 10 + "/10"}
                >
                  <center>
                    <span style={{ position: "relative" }}>
                      <div
                        className="bg-light"
                        style={{
                          position: "absolute",
                          right: 0,
                          width: (1 - ele.calification) * 100 + "%",
                        }}
                      >
                        &nbsp;
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    </span>
                  </center>
                </Card.Footer>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </>
  );
}

export default Reviews;
