import React from 'react'

let cardArray = [];
let count = 0;

class App extends React.Component{

    constructor(props){
        super(props);
        this.state={
            cardArrayData: cardArray
        }
        this.cardArrayState = this.cardArrayState.bind(this)
    }

    cardArrayState(){
        this.setState({
            cardArrayData: cardArray
        })
    }

    render(){
        return(
            <div>
            <Button cardState={this.cardArrayState}/>
            <Album data={this.state.cardArrayData} cardRemove = {this.cardArrayState} className="columnRight"/>
            </div>

        );
    }
}

class Album extends React.Component{
    constructor(props){
        super(props);
        this.state={}
        
    }
    render(){
        return(
            <div className='album'>
                {this.props.data.map(card=><Card id={card.id} link={card.link} caption = {card.caption} deleteClicked={this.props.cardRemove}/>)}
            </div>
        )
    }
}


class Button extends React.Component{
    constructor(props){
        super(props);
        this.state={
            openForm: false,
            cancel: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleClick(){
        this.setState(prevState =>({
            openForm : !prevState.openForm,
            cancel: !prevState.cancel
        })) 
    }

    handleCancel(){
        this.setState(prevState=>({
            openForm: !prevState.openForm,
            cancel: !prevState.cancel
        }))
    }

    render(){
        return(
        <div className='columnLeft'>
            <button className="ButtonForm" onClick={this.handleClick}>Open Dialog</button>
            {this.state.openForm ? <Form accept = {this.handleClick} cardState={this.props.cardState}/> : null}
            {this.state.cancel ? <button className="ButtonCancel" onClick={this.handleCancel}>Cancel</button> : null}
        </div> 
        )
    }
}
class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
            link: "",
            caption: "",
            error: false,    
        }
        this.handleLink = this.handleLink.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)

    }
    
    handleLink(event){
        this.setState({
            link: event.target.value
        })
    }
    handleName(event){
        this.setState({
            caption: event.target.value
        })
    }

    handleSubmit(event){
        if(this.state.link==="" ){
            event.preventDefault()
            this.setState({
                error: true,
                link: ""
            })
        }
        else if(this.state.caption===""){
            event.preventDefault()
            this.setState({
                error:true,
                caption: ""
            })
        }
        else{
            event.preventDefault()
            this.setState({error: false})
            let card = {id: count, link: this.state.link, caption: this.state.caption};
            cardArray.unshift(card);
            count++;
            this.props.cardState();
            this.props.accept();
        }
        
    }

    handleCancel(){
        if(this.props.cancel === true){
        this.setState({
            link: null,
            caption: null,

        })}
    }

    render(){
        return (
            <div>
            <form className='form'
            onSubmit={this.handleSubmit}
            id = "Information"
            >
                <fieldset>
                <input 
                type = "url"
                onChange={this.handleLink}
                value = {this.state.link}
                name = "link"
                placeholder="Enter Picture link"
                />
                <input
                type = "text"
                onChange={this.handleName}
                value = {this.state.caption}
                name = "caption"
                placeholder="Enter Picture Name"
                />
                <button className="Button" type="submit">Accept</button>
                </fieldset>
            </form>
            {this.state.error ? <p className='Error'>Enter a link AND a caption</p>: null}
            </div>

        )
    }   
}

class Card extends React.Component{
    constructor(props){
        super(props);
        this.state={}
        this.cardDelete = this.cardDelete.bind(this)
    }

    cardDelete(event){
        cardArray = cardArray.filter(card => card.id!== parseInt(event.target.id))
        this.props.deleteClicked()
    }
 
    render(){
        return(
            <div className='Card'>
                <img src = {this.props.link}  width = '150px' height ='150px' alt="this is not a valid link"></img>
                <p>{this.props.caption}</p>
                <button onClick={this.cardDelete} id={this.props.id}>x</button>
            </div>
        
        )
        
    }
}

export default App