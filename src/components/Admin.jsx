import React,{useState, useEffect} from 'react'
import firebaseApp, { auth } from '../firebase'
import {useHistory} from 'react-router-dom'
import Brand from './Brand'
import Loader from './Loader'
                

export default function Admin(){
    const history = useHistory();
    const [question,setQuestion] = useState("");
    const [a,setA] = useState("");
    const [b,setB] = useState("");
    const [c,setC] = useState("");
    const [d,setD] = useState("");
    const [ans,setAns] = useState("");
    const [cat,setCat] = useState("");
    let [message, setMessage]=useState("");
    const [uploading, setuploading] = useState(false);
	
	const signOut=()=>{
        firebaseApp.auth().signOut().then(() => {
            history.push("/admin-login");
        }).catch((error) => {
            console.log(error.message);
        });
	}
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if(!user){
            history.push('/admin-login')
          }
        })
    });

    const addQuestion=(event)=>{
        const img=document.getElementById("image").files[0];
        const timeStamp=new Date().getTime();
        event.preventDefault();
        if(question==="" || a==="" || b==="" || c==="" || d==="" || ans==="" || cat===""){
           setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>Fill out all the fields first.</p>);
            setTimeout(() => {
                   setMessage("");
            }, 2000);
        }else{
            if(img){
                var metadata={
                    contentType:img.type,
                }
                setuploading(true);
                firebaseApp.storage().ref().child("images/"+timeStamp).put(img, metadata).then(()=>{
                    firebaseApp.storage().ref().child("images/"+timeStamp).getDownloadURL().then(url=>{
                        firebaseApp.firestore().collection('Questions').add({
                            category: cat,
                            question: question,
                            A: a,
                            B: b,
                            C: c,
                            D: d,
                            ans:ans,
                            img:url,
                        }).then(()=>{
                            setuploading(false);
                            setMessage(<p style={{'color':'#f1faee'}}>Successfully added to the database.</p>)   
                            setTimeout(() => {
                                setMessage("");
                                window.location.reload();
                            }, 2000);
                        }).catch((e)=>{
                            setMessage(<p style={{'color':'#E63946'}}>Some error has occured.</p>);
                            setTimeout(() => {
                                setMessage("");
                            }, 3000);
                        })
                    })
                })
            }else{
                firebaseApp.firestore().collection('Questions').add({
                    category: cat,
                    question: question,
                    A: a,
                    B: b,
                    C: c,
                    D: d,
                    ans:ans,
                    img:"",
                }).then(()=>{
                    setMessage(<p style={{'color':'#f1faee'}}>Successfully added to the database.</p>)   
                    setTimeout(() => {
                        setMessage("");
                        window.location.reload();
                    }, 2000);
                }).catch((e)=>{
                    setMessage(<p style={{'color':'#E63946'}}>Some error has occured.</p>);
                    setTimeout(() => {
                        setMessage("");
                    }, 3000);
                })
            }
        }
    }
    return(<div>
	<div style={{'display':'grid', 'gridTemplateColumns':'1fr 1fr'}}>
			<div style={{'padding':'25px 25px', 'float':'left'}} className="grid-item">
				<h3 style={{'color':'#E63946', 'fontWeight':'bolder', 'textAlign':'left'}}>
					RECRUITMENTS
                </h3>
          </div>
		  <div style={{'float':'right'}}>
				<button style={{'float':'right'}} className="submit-btn" onClick={signOut}>LOGOUT</button>
		</div>
	</div>
	<div style={{'paddingTop':'0px'}} className="landing-page">
                <h3>Have a good question in mind? Bring it On.</h3>
                <form>
                <div className="d-flex justify-content-center">
                    <div>
                        <select required onClick={e=>setCat(e.target.value)}>
                            <option value="">Select Category</option> 
                            <option value="Straight">Straight</option>
                            <option value="Bonus">Bonus</option>
                        </select>
                        <textarea required value={question} onChange={event=>setQuestion(event.target.value)} type="text" placeholder="Question" />
                        <input style={{'padding':window.innerWidth<600?'20px 10%':'20px 25%'}} type="file" id="image" />
                        <input required value ={a} onChange={(event)=>setA(event.target.value)} type="text" placeholder="Option 1" />
                        <input required value={b} onChange={(event)=>setB(event.target.value)} type="text" placeholder="Option 2" />
                        <input required value={c} onChange={(event)=>setC(event.target.value)} type="text" placeholder="Option 3" />
                        <input required value={d} onChange={(event)=>setD(event.target.value)} type="text" placeholder="Option 4" />
                        <select required onClick={e=>setAns(e.target.value)}>
                            <option value="">Select the correct option</option> 
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <a href="/verification">
                        <button onClick={addQuestion}>{uploading?<div>Uploading Image <Loader /></div>:<div>Push to the Database</div>}</button>
                    </a>
                </div>
                <div style={{'padding':'0 10px', 'textAlign':'center'}}>{message}</div>
                <Brand />
                </form>
            </div>
		</div>
        );
}