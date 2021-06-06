import React, { Component } from "react"
import './Conversor.css'

import { Button, Progress } from 'reactstrap';

export default class Conversor extends Component {

    constructor(props){
        super(props);

        this.state = {
            valor_moedaA: "",
            valor_moedaB: 0
        }

        this.converter = this.converter.bind(this);
    }

    converter() {

        let de_para = `${this.props.moedaA}_${this.props.moedaB}`
        let url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=ultra&apiKey=f14c955ca374b42f6f0c`

        fetch(url)
        .then(res => {
            return res.json()
        })
        .then(json => {
            let cotacao = json[de_para]
            let valor_moedaB = (cotacao * parseFloat(this.state.valor_moedaA)).toFixed(2)
            this.setState({ valor_moedaB })
        })
    }

    render() {
        return(
            <div className="conversor">
                <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
                <input type="number" onChange={(event) => {this.setState({valor_moedaA: event.target.value})}}></input>
                <Button color="success" onClick={this.converter}>Converter</Button>
                {/*<input type="button" value="Converter" onClick={this.converter}></input>*/}
                <h2>Valor convertido é {this.state.valor_moedaB} </h2>
                <Progress value={this.state.valor_moedaB} />
            </div>
        )
    }
}