export default function Home() {
    return (
        <div className="Home">
            {/* <!-- DEMO ONLY --> */}
                <div className="demo-cols">
                <button id="button" aria-describedby="tooltip">My button</button>
                <button id="button2" aria-describedby="tooltip">My button 2</button>
                <button id="button3" aria-describedby="tooltip">My button 3</button>
                </div>
                {/* <!-- DEMO: Start Button triggers the tour, but you can use other elements, specify in kernels.js. --> */}
                <button id="startTourBtn" className="btn">Start Tour</button>
            {/* <!-- /DEMO ONLY --> */}
            <br /><br />
            <a className="App-link" href="/about">
                About
            </a>
        </div>
    );
  }