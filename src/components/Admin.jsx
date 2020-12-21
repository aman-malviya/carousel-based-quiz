import React from 'react'

export default function Admin(){
    return(<div className="landing-page">
                <h3>Have a good question in mind? Bring it On.</h3>
                <div className="d-flex justify-content-center">
                    <div>
                        <input type="text" placeholder="Event Name" />
                        <textarea type="text" placeholder="Question" />
                        <input value ='' type="text" placeholder="Option 1" />
                        <input value='' type="text" placeholder="Option 2" />
                        <input value='' type="text" placeholder="Option 3" />
                        <input value='' type="text" placeholder="Option 4" />
                        <select>
                            <option>Select the correct option</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <a href="/verification">
                        <button>Push to the Database</button>
                    </a>
                </div>
                <div className="brand">
                    Quizzers' Club
                    <br />
                    <span style={{'color':'#E63946', 'fontSize':'1.4rem'}}>
                        MANIT
                    </span>
                </div>
            </div>
        );
}