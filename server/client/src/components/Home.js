import  React, {useState} from 'react'
import {Form, FormControl, Button, Dropdown, Card, Row} from 'react-bootstrap'
import {gql, useQuery} from '@apollo/client'
import loli from './images/lolita.jpg'
import cha from './images/chanel.png'
import lou from './images/loulou.jpg'
import orchid from './images/blackorchid.jpg'
import lancome from './images/poemlancome.jpg'
import mainson from './images/mainson.jpg'
import blue from './images/blue.jpg'
import rochas from './images/femme.jpg'
import dior2 from './images/missdior.webp'
import addict from './images/dioraddict.jpg'

//i commentate this code on the review component im refactoring it
const baccarat = mainson;
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
    query getPerfs($categ:[String]){
        getPerfs(categ: $categ){
            id
            perfTitle
            perfBody
            calification
        }
    }
`
function Home() {
    const [filterVal, setFilterVal] = useState("");
    const [categ, SetCateg] = useState();
    const { loading, error, data } = useQuery(GET_REVIEWS,{
        variables: {
            categ: categ
        }
    });
    let customPlaceHolder = "Search"
    if(categ){
        customPlaceHolder = categ.join(" ");
    }
    //On change get the search bar value
    const handleChange = e =>{
        setFilterVal(e.target.value)
    }
    const handleCategories = (e) =>{
        let formatingCategorie = e.target.innerText.toUpperCase();
        // rember remplace this with case statement for legibility
        // add categories to the home query to filters the search data
        if(categ){
            if(formatingCategorie == "FLORAL_ORIENTAL")
                SetCateg([...categ,"FLORAL", "ORIENTAL", "FLORAL_ORIENTAL"]);
            if(formatingCategorie == "FLORAL"){
                SetCateg([...categ, "FLORAL", "FLORAL_ORIENTAL"]);
            }
            if(formatingCategorie == "ORIENTAL"){
                SetCateg([...categ, "ORIENTAL","FLORAL_ORIENTAL"])
            }
            else
                SetCateg([...categ, formatingCategorie]);
        }
        else {
            if(formatingCategorie == "FLORAL_ORIENTAL")
                SetCateg(["FLORAL", "ORIENTAL", "FLORAL_ORIENTAL"]);
            if(formatingCategorie == "FLORAL"){
                SetCateg(["FLORAL", "FLORAL_ORIENTAL"]);
            }
            if(formatingCategorie == "ORIENTAL"){
                SetCateg(["ORIENTAL","FLORAL_ORIENTAL"])
            }
            else
                SetCateg([formatingCategorie])
            
        }

    }
    // i commented this peace of code in the review component
    // monkey love callbacks and eat spaghetti
    const handleImageName = (index) => {
       let hIN = data.getPerfs[index]["perfTitle"].split(" ")[0].toLowerCase();
       if ( /l.heure/.test(hIN) ) {
            hIN = "lheure"
        }
       try {
           return eval(hIN);
       }
       catch (err) {
           console.log(err)
           return
       }
    }
   
    if(loading) return <h2>loading</h2>
    if(error) return <h2>{error}</h2>
    return (
        <>
            <h1>Secentifolia</h1>
            <br/>
            <Form inline className="d-flex justify-content-center align-items-center mr-5 row">
                <FormControl onChange={handleChange} type="text" placeholder={customPlaceHolder} className="col-12 col-sm-12 col-md-12 col-lg-8 m-1" />
                <Dropdown>
                    <Dropdown.Toggle>
                        Categories
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleCategories}>
                            Chipre
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleCategories}>
                            Oriental
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleCategories}>
                            Verde
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleCategories}>
                           Citrico
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleCategories}>
                            Amaderado
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleCategories}>
                            Gourmand
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleCategories}>
                            Floral
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleCategories}>
                            Fougeres
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Form>
            <br/>
            <Row>
                {
                    // if is something to filter in the searchbar or the user select a categorie in the dropdown -> filter
                    filterVal||categ?(
                        data.getPerfs.map((ele, index)=>{
                            let ok= new RegExp(`${filterVal}`,"gi")
                            if(ok.test(ele.perfTitle)){
                               
                    return ( 
                        <Card className="col-12 col-xl-6" key={ele.id}>
                            <Card.Body>
                                <Card.Title className="text-center"><h3>{ele.perfTitle}</h3></Card.Title>
                                <Card.Img src={handleImageName(index)}></Card.Img>
                                <Card.Text>
                                    {ele.perfBody}
                                </Card.Text>
                                <Card.Footer className="bg-light" data-toggle="tooltip" title={ele.calification*10 + "/10"}>
                                    <center>
                                    <span style={{position:"relative"}}>
                                        <div className="bg-light" style={{position:"absolute", right:0, width:((1-ele.calification)*100)+"%"}}>&nbsp;</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                    </span>
                                    </center>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    )}
                })
                    ):(<></>)
                }
            </Row>
        </>
    )
}

export default Home
