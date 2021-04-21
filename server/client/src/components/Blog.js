import React from 'react'
import { Card, Row } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

const GET_BLOGS = gql`
    query {
        getBlogs {
            id
            blogTitle
            blogBody
        }
    }
`

function Blog() {
    const { loading, error, data } = useQuery(GET_BLOGS);
    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>{error}</h2>
    return (
        <>
        <Row>
            {data.getBlogs.map(ele=>{
                return(
                    <Card className="col-12" key={ele.id}>
                        <Card.Img></Card.Img>
                        <Card.Body>
                            <Card.Title className="text-center" >{ele.blogTitle}</Card.Title>
                            <Card.Text dangerouslySetInnerHTML={{__html: ele.blogBody}}>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            })}
        </Row>
        </>
    )
}

export default Blog
