import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const initialItem = {
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const UpdateMovie = (props) => {
    const [movieInfo, setMovieInfo] = useState({ initialItem })
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovieInfo(res.data)
            })
            .catch(err => console.log(err))
    }, [id])

    // useEffect(() => {
    //     console.log("testing props", props.items)
    //     const editingItem = props.items.find(thing => {
    //         if (`${thing.id}` === props.match.params.id) {

    //         }
    //         return thing
    //     })
    //     if (editingItem) {
    //         setMovieInfo(editingItem)
    //     }
    // }, [props.items, props.match.params])

    const changeHandle = e => {
        e.persist()
        let value = e.target.value;
        if (e.target.name === "metascore") {
            value = parseInt(value, 10)
        }
        console.log(movieInfo)
        setMovieInfo({
            ...movieInfo,
            [e.target.name]: value
        })
    }

    const changeHandler = e => {
        setMovieInfo({
            ...movieInfo,
            stars: [e.target.value]
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(movieInfo)
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movieInfo)
            .then(res => {
                console.log(movieInfo)
                setMovieInfo(initialItem)
                props.history.push('/')
            })


        // const id = Number(props.match.params.id)
        // props.updateItem(id, movieInfo)
    }

    return (
        <div>
            <h2>Edit Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placholder="Title"
                    onChange={changeHandle}
                    value={movieInfo.title}
                />
                <input
                    type="text"
                    name="director"
                    placholder="Title"
                    onChange={changeHandle}
                    value={movieInfo.director}
                />
                <input
                    type="text"
                    name="metascore"
                    placholder="Title"
                    onChange={changeHandle}
                    value={movieInfo.metascore}
                />
                <input
                    type="text"
                    name="stars"
                    placholder="Title"
                    onChange={changeHandler}
                    value={movieInfo.stars}
                />
                <br />
                <button
                >Save Changes</button>
            </form>


        </div>
    )
}
export default UpdateMovie