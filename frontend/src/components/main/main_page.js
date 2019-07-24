import React from 'react'
import './main.css'

class MainPage extends React.Component {
    constructor(props) {      
        super(props);   


        this.state={
            show: "Phone-1 phone-show",
            hidden: "Phone-1",
        }

        // this.showPic = this.showPic.bind(this)
    }

    componentDidMount() {
        // this.showPic()
    }

    HASH = {
        1: "show",
        2: "hidden",
        3: "hidden",
        4: "hidden",
        5: "hidden",
    }

    // showPic() {


    //      let i = 1

    //     while ( i < 6) {
    //         this.HASH[i] = "show";
    //         setTimeout(function() {i +1}, 3000)

    //     }
    // }


    
    render() {
        return (
          <section className="Main-Page-Wrapper">
            <main className="Main-Page-Holder">
              <article className="Main-Page-Article">
                <div className="Main-Page-Phone">
                  <div className="Main-Page-Phone-Holder">
                    <img className={this.state[this.HASH[1]]} src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg" />
                    <img className={this.state[this.HASH[2]]} src="https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg" />
                    <img className={this.state[this.HASH[3]]} src="https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg" />
                    <img className={this.state[this.HASH[4]]} src="https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg" />
                    <img className={this.state[this.HASH[5]]} src="https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg" />
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