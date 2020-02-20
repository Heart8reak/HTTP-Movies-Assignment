import React, { useState } from 'react'
import axios from 'axios'


const AddMovie = props => {
    const addMovie = {
        id: Date.now(),
        title: "",
        director: "",
        metascore: "",
        stars: []
    }

    const [data, setData] = useState(addMovie)

    const handleChange = e => {
        let value = e.target.value;
        if (e.target.name === "metascore") {
            value = parseInt(value, 100)
        }
        setData({
            ...data,
            [e.target.name]: value
        })
    }

    const handleChanger = e => {
        setData({
            ...data,
            stars: [e.target.value]
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setData({ ...data })
        axios
            .post("http://localhost:5000/api/movies", data)
            .then(res => {
                console.log("New Movie added to the list", res)
                setData(addMovie)
                props.history.push("/")
            })
            .catch(err => {
                console.log("The new movie was not added!", err)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Add Movie</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="director"
                    placeholder="Director"
                    value={data.director}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="metascore"
                    placeholder="Metascore"
                    value={data.metascore}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="stars"
                    placeholder="Stars"
                    value={data.stars}
                    onChange={handleChanger}
                />
                <button>Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie