import React, { Component } from 'react'


class MemeGenerator extends Component {

    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "https://i.imgflip.com/1ur9b0.jpg",
            allMemeImg: [],
            sugestionImgOne: "",
            sugestionImgTwo: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.random = this.random.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                this.setState({
                    allMemeImg: memes
                })
            })
    }

    handleChange(event) {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const rndm = Math.floor(Math.random() * this.state.allMemeImg.length)
        const imgUrl = this.state.allMemeImg[rndm].url
        this.setState({
            randomImg: imgUrl,
        })
    }

    random() {
        const rndm = Math.floor(Math.random() * this.state.allMemeImg.length)
        const imgUrl = this.state.allMemeImg[rndm].url
        return imgUrl
    }

    render() {

        return (
            <div className="grid">
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input
                        type="textbox"
                        name="topText"
                        value={this.setState.topText}
                        onChange={this.handleChange}
                        placeholder="Top Text"
                    />
                    <input
                        className="bottomText"
                        type="textbox"
                        name="bottomText"
                        value={this.setState.bottomText}
                        onChange={this.handleChange}
                        placeholder="Bottom Text"
                    />
                    <button className="submitButton">Gen</button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator