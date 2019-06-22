import React from 'react'
import './main.css'

class MainPage extends React.Component {
    constructor(props) {      
        super(props);   

        setInterval(() => {
            let nextState = this.state.imgVisible +1

            nextState =nextState > 4 ? 0 : nextState
            this.setState({imgVisible: this.state.imgVisible +1})
        }, 2000)
        this.state={
            1: "Phone-1",
            2: "Phone-1 Phone-2",
            3: "Phone-1 Phone-3",
            4: "Phone-1",
            5: "Phone-1",
            imgVisible: 0
        }
    }

    getClass(currentImg) {
        if (this.state.imgVisible === currentImg) {

            return 'Main-Page-Image-Transition Main-Page-Image-Transition-Show'
        } else {
            
            return "Main-Page-Image-Transition";
        }

    }
    changePic(input) {
        
        if (input === 1) {
            this.setState({1: this.state[2]})
        } else if (input === 2) {
            this.setState({ 2: this.state[3] }) 
        } else if (input === 3) {
            this.setState({ 3: this.state[4] })
        } else if (input === 4) {
            this.setState({ 4: this.state[5] })
        } else if (input === 5) {
            this.setState({ 5: this.state[1] })
        }
    }
    render() {
        return (
          <section className="Main-Page-Wrapper">
            <main className="Main-Page-Holder">
              <article className="Main-Page-Article">
                <div className="Main-Page-Phone">
                  <div className="Main-Page-Phone-Holder">
                    <img className={this.getClass(0)} src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg" />
                    <img className={this.getClass(1)} src="https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg" />
                    <img className={this.getClass(2)} src="https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg" />
                    <img className={this.getClass(3)} src="https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg" />
                    <img className={this.getClass(4)} src="https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg" />
                  </div>
                </div>
                <div />
              </article>
            </main>
          </section>
        );
    }
}

export default MainPage;