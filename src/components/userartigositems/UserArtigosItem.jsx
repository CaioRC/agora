import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Link, Redirect } from 'react-router-dom';

import { geUserByID, deleteArticleByID } from '../../Api'
import "./UserArtigosItem.css"


class UserArtigosItem extends Component {
    constructor() {
        super();
        this.state = {
            nome: "",
            idAutor: "",
        }
    }

    componentDidMount() {
        console.log(this.props)
        this.callAutorId();
    }

    async callAutorId() {
        const autor = await geUserByID(this.props.autorId)

        this.setState({
            nome: autor.nome,
            idAutor: autor.id
        })
    }

    async handleDelete() {



        const excluir = window.confirm("Confimar Exclusão.")

        if (excluir) {
            const deleteRes = await deleteArticleByID(this.props.id)
            alert("Artigo deletado com sucesso.")
        this.props.callApi()
        }

        // // )
        // this.setState({
        //     nome: "",
        //     idAutor: "",
        // })

    }

    render() {
        return (
            <div className="UserArtigosItem">
                <Link className="UserArtigosItemLink" to={"/usuario/" + this.state.idAutor}>
                    <div className="personalInfo">
                        <img className="circularPhoto" src="data:image/png;base64,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" alt="Avatar" />
                        <div className="Authorname">
                            {this.state.nome}
                        </div>
                    </div>
                </Link>
                <Link className="UserArtigosItemLinkArticle" to={"/artigo/" + this.props.id}>
                    <div className="textInfo">
                        <div className="Trendingtitle">
                            {this.props.titulo}
                        </div>
                        <div className="description">
                            {this.props.descricao}
                        </div>
                    </div>
                </Link>
                {   this.props.currentUser.id === this.state.idAutor ?
                    <div className="buttonsArticle">
                        <Link to={{
                            pathname: "/write",
                            state: {
                                alterar: true,
                                titulo: this.props.titulo,
                                descricao: this.props.descricao,
                                conteudo: this.props.conteudo,
                                categoria: this.props.conteudo,
                                id: this.props.id
                            }
                        }} >
                            <button className="AlterarButton" > Alterar </button>
                        </Link>
                        <button className="DeletarButton" onClick={this.handleDelete.bind(this)}> Deletar </button>
                    </div> : null
                }
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(UserArtigosItem);